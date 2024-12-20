import datetime
import time
from logging import exception
from xml.etree.ElementPath import xpath_tokenizer, xpath_tokenizer_re
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import json



# Создание списков и переменных
prices_list = ["средние", "высокие", "выше среднего"]
cat_list = ["итальянская", "европейская", "смешанная", "авторская", "японская", "американская", "мясная", "средиземноморская", "узбекская", "русская", "морская", "рыбная", "тайская", "азиатская", "французская", "мексиканская", "латиноамериканская", "восточная", "паназиатская", "нет специализации", "греческая", "еврейская", "вегетарианская", "веганская", "кавказская", "фьюжн", "корейская", "домашняя", "осетинская", "национальная", "шашлык", "грузинская", "вьетнамская"]



with open('all_links.txt', 'r', encoding='utf-8') as file:
    content = file.read().strip()
    links = content.split(',')



def parser(link):
    browser = webdriver.Chrome()
    browser.maximize_window()
    browser.get(link)
    wait = WebDriverWait(browser, 10)
    wait.until(EC.visibility_of_element_located((By.CLASS_NAME, 'orgpage-header-view__header')))
    time.sleep(0.3)

    cuisine_type = ['Неизвестно']
    pr = 'Неизвестно'
    name = 'Неизвестно'
    description = 'Неизвестно'
    rating = 0
    address = 'Неизвестно'
    ph_url = ''

    name = browser.find_element(By.CLASS_NAME,'orgpage-header-view__header').text
    try:
        description = browser.find_element(By.CLASS_NAME,'business-story-entry-view__description').text
    except:
        description = ('Неизвестно')
    try:
        rating = browser.find_element(By.CLASS_NAME,'business-rating-badge-view__rating-text').text
        rating = float(rating.replace(',', '.'))
    except:
        rating = 0
    address = browser.find_element(By.CLASS_NAME,'business-contacts-view__address-link').text
    if 'Санкт-Петербург' in address:
        pass
    else:
        address = address + ', Санкт-Петербург'
    try:
        elements = browser.find_elements(By.CLASS_NAME,'business-features-view__valued-value')
        for price in elements:
            if price.text in prices_list:
                pr = price.text
    except:
        pr = ['Неизвестно']
    try:
        ph_url = browser.find_elements(By.CLASS_NAME,'img-with-alt')[1].get_attribute('src')
    except:
        ph_url = ''




    browser.find_element(By.CSS_SELECTOR, "div[aria-label='Особенности, ']").click()

    time.sleep(0.5)

    try:
        categorys = browser.find_elements(By.CLASS_NAME, 'business-features-view__valued-value')
        for category in categorys:
            if any(word in category.text for word in cat_list):
                dish = category.text
                cuisine_type = dish.split(', ')
        cuisine_nums = []
        for category in cuisine_type:
            cuisine_nums.append(cat_list.index(category) + 1)
    except:
        cuisine_nums = [0]

    return {
        "name": name,
        "description": description,
        "rating": rating,
        "address": address,
        "prices": pr,
        "cuisine_type": cuisine_nums,
        "photo_links": ph_url
    }



for link in links:
    link = link.strip("'\', '\'")
    data = parser(link)
    with open('data.json', 'a', encoding='utf-8') as file:
        json.dump(data, file, ensure_ascii=False, indent=4)
    print(link, data)



