from django.db import models
import json
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import MinMaxScaler


class RestaurantRecommender:

    def __init__(self, all_restaurants_path, price_map):
        # Загрузка данных из JSON-файла
        with open(all_restaurants_path, 'r', encoding='utf-8') as f:
            self.all_restaurants = json.load(f)

        # Маппинг ценовой категории в числовой вид
        self.price_map = price_map

        # Уникальные типы кухни из всех ресторанов
        self.unique_cuisines = list(set(cuisine for r in self.all_restaurants for cuisine in r["cuisine_type"]))

        # Преобразуем все рестораны в векторное представление
        vectors = []
        for restaurant in self.all_restaurants:
            rating = restaurant["rating"]
            price = self.price_map[restaurant["prices"]]
            cuisine_vector = [1 if cuisine in restaurant["cuisine_type"] else 0 for cuisine in self.unique_cuisines]
            vectors.append([rating, price] + cuisine_vector)

        self.all_vectors = np.array(vectors)

        # Нормализация признаков (рейтинг и цена)
        scaler = MinMaxScaler()
        self.all_vectors[:, :2] = scaler.fit_transform(self.all_vectors[:, :2])

        # Вычисление косинусной схожести между всеми ресторанами
        self.similarity_matrix = cosine_similarity(self.all_vectors)

    def get_recommendations(self, liked_restaurants, top_n=20):
        """
        Генерация рекомендаций на основе лайкнутых ресторанов.

        :param liked_restaurants: Список лайкнутых ресторанов
        :param top_n: Количество рекомендаций
        :return: Список рекомендованных ресторанов
        """
        # Поиск индексов лайкнутых ресторанов в основном списке
        transformed_restaurants = [
            {key: value for key, value in restaurant.items() if key != 'id'}  
            for restaurant in liked_restaurants
        ]
        liked_indices = [i for i, r in enumerate(self.all_restaurants) if r in transformed_restaurants]
        if not liked_indices:
            return []

        # Если лайкнут один ресторан, берем его строку схожести
        if len(liked_indices) == 1:
            similarity_scores = self.similarity_matrix[liked_indices[0]]
        else:
            # Усредняем схожести для нескольких ресторанов
            similarity_scores = np.mean(self.similarity_matrix[liked_indices], axis=0)

        # Находим индексы топ-N похожих ресторанов, исключая уже лайкнутые
        recommended_indices = np.argsort(similarity_scores)[::-1]
        recommended_indices = [i for i in recommended_indices if i not in liked_indices]

        # Убираем дубликаты по названию
        seen_names = set()
        unique_recommendations = []
        for i in recommended_indices:
            name = self.all_restaurants[i]["name"]
            if name not in seen_names:
                unique_recommendations.append(self.all_restaurants[i])
                seen_names.add(name)
            if len(unique_recommendations) >= top_n:
                break

        return unique_recommendations