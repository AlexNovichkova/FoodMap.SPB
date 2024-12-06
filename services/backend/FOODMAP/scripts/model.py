import json
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import MinMaxScaler

# Загрузка данных из JSON-файлов
with open('data_fixed.json', 'r', encoding='utf-8') as f:
    all_restaurants = json.load(f)

with open('liked_restaurants.json', 'r', encoding='utf-8') as f:
    liked_restaurants = json.load(f)

# Маппинг ценовой категории в числовой вид
price_map = {
    "средние": 1,
    "выше среднего": 2,
    "высокие": 3
}

# Уникальные типы кухни из всех ресторанов
unique_cuisines = list(set(cuisine for r in all_restaurants for cuisine in r["cuisine_type"]))

# Функция для преобразования ресторана в числовой вектор
def restaurant_to_vector(restaurant):
    rating = restaurant["rating"]
    price = price_map[restaurant["prices"]]
    cuisine_vector = [1 if cuisine in restaurant["cuisine_type"] else 0 for cuisine in unique_cuisines]
    return [rating, price] + cuisine_vector

# Преобразуем все рестораны в векторное представление
all_vectors = np.array([restaurant_to_vector(r) for r in all_restaurants])

# Нормализация признаков (рейтинг и цена)
scaler = MinMaxScaler()
all_vectors[:, :2] = scaler.fit_transform(all_vectors[:, :2])

# Вычисление косинусной схожести между всеми ресторанами
similarity_matrix = cosine_similarity(all_vectors)

# Поиск индексов лайкнутых ресторанов в основном списке
liked_indices = [i for i, r in enumerate(all_restaurants) if r in liked_restaurants]

# Функция для получения рекомендаций
def recommend_restaurants(liked_indices, top_n=20):
    if not liked_indices:
        return []

    # Если лайкнут один ресторан, берем его строку схожести
    if len(liked_indices) == 1:
        similarity_scores = similarity_matrix[liked_indices[0]]
    else:
        # Усредняем схожести для нескольких ресторанов
        similarity_scores = np.mean(similarity_matrix[liked_indices], axis=0)

    # Находим индексы топ-N похожих ресторанов, исключая уже лайкнутые
    recommended_indices = np.argsort(similarity_scores)[::-1]
    recommended_indices = [i for i in recommended_indices if i not in liked_indices]

    # Убираем дубликаты по названию
    seen_names = set()
    unique_recommendations = []
    for i in recommended_indices:
        name = all_restaurants[i]["name"]
        if name not in seen_names:
            unique_recommendations.append(all_restaurants[i])
            seen_names.add(name)
        if len(unique_recommendations) >= top_n:
            break

    return unique_recommendations

# Генерация рекомендаций
recommendations = recommend_restaurants(liked_indices)

# Сохранение рекомендаций в JSON файл
with open('recommendations.json', 'w', encoding='utf-8') as f:
    json.dump(recommendations, f, ensure_ascii=False, indent=4)

print("Рекомендации сохранены в файл 'recommendations.json'")