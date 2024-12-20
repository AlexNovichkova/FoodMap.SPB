from django.db import models
import json
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import MinMaxScaler


class RestaurantRecommender:

    def __init__(self, all_restaurants_path, price_map):
        with open(all_restaurants_path, 'r', encoding='utf-8') as f:
            self.all_restaurants = json.load(f)

        self.price_map = price_map
        self.unique_cuisines = list(set(cuisine for r in self.all_restaurants for cuisine in r["cuisine_type"]))
        vectors = []
        for restaurant in self.all_restaurants:
            rating = restaurant["rating"]
            price = self.price_map[restaurant["prices"]]
            cuisine_vector = [1 if cuisine in restaurant["cuisine_type"] else 0 for cuisine in self.unique_cuisines]
            vectors.append([rating, price] + cuisine_vector)

        self.all_vectors = np.array(vectors)

        scaler = MinMaxScaler()
        self.all_vectors[:, :2] = scaler.fit_transform(self.all_vectors[:, :2])
        self.similarity_matrix = cosine_similarity(self.all_vectors)


    def get_recommendations(self, liked_restaurants, top_n=20):

        transformed_restaurants = [
            {key: value for key, value in restaurant.items() if key != 'id'}  
            for restaurant in liked_restaurants
        ]
        liked_indices = [i for i, r in enumerate(self.all_restaurants) if r in transformed_restaurants]
        if not liked_indices:
            return []

        if len(liked_indices) == 1:
            similarity_scores = self.similarity_matrix[liked_indices[0]]
        else:
            similarity_scores = np.mean(self.similarity_matrix[liked_indices], axis=0)

        recommended_indices = np.argsort(similarity_scores)[::-1]
        recommended_indices = [i for i in recommended_indices if i not in liked_indices]

        seen_names = set()
        unique_recommendations = []
        for i in recommended_indices:
            name = self.all_restaurants[i]["name"]
            if name not in seen_names:
                restaurant_info = {
                    'id': str(i+1),
                    'name': self.all_restaurants[i]['name'],
                    'description': self.all_restaurants[i]['description'],
                    'rating': self.all_restaurants[i]['rating'],
                    'address': self.all_restaurants[i]['address'],
                    'prices': self.all_restaurants[i]['prices'],
                    'cuisine_type': self.all_restaurants[i]['cuisine_type'],
                    'photo_links': self.all_restaurants[i]['photo_links']
                }
                unique_recommendations.append(restaurant_info)
                seen_names.add(name)
            if len(unique_recommendations) >= top_n:
                break
        return unique_recommendations