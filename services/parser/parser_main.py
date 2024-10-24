import datetime
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver import ActionChains
from fake_useragent import UserAgent
import random
from time import sleep


PATH_TO_WEBDRIVER = 'C:\chromedriver-win64\chromedriver-win64\chromedriver.exe'


def parse_links(url):
    t0 = datetime.datetime.now()
    driver.get(url)
    driver.maximize_window()


    #cлайдбар
    slider = driver.find_element(By.CLASS_NAME, 'scroll__scrollbar-thumb')


    #прокрутка и парсинг ссылок
    max_errors = 10
    organizations_hrefs = []
    errors = 0
    t0 = datetime.datetime.now()
    var = datetime.timedelta(minutes=15)
    while max_errors > errors:
        try:
            t1 = datetime.datetime.now()
            if t1 - t0 > var:
                return organizations_hrefs
            ActionChains(driver).click_and_hold(slider).move_by_offset(0, int(10)).release().perform()
            slider_organizations_hrefs = driver.find_elements(By.CLASS_NAME, 'link-overlay')
            slider_organizations_hrefs = [href.get_attribute("href") for href in slider_organizations_hrefs]
            organizations_hrefs = list(set(organizations_hrefs + slider_organizations_hrefs))
            sleep(random.uniform(0.05, 0.1))
            try:
                end = driver.find_element(By.CLASS_NAME, 'add-business-view')
                if end:
                    return organizations_hrefs
            except:
                continue
        except Exception as exception:
            errors += 1
            print(exception)

    return organizations_hrefs


def links_union(num_of_links):
    all_links = []
    for num in range(1, num_of_links):
        with open(f"data\\link_{num}.txt", "r") as file:
            data = file.read().replace('[', '').replace(']', '').replace("'", '').split(', ')
            for link in data:
                all_links.append(link)
    all_links = set(all_links)
    with open(f"data\\all_links.txt", "w") as file:
        file.write(str(all_links))


if __name__ == "__main__":

    #настройка Selenium
    options = webdriver.ChromeOptions()
    ua = UserAgent(browsers=['chrome'])
    us = ua.random
    options.add_argument(f"user-agent={us}")
    options.add_argument("user-data-dir=C:\\Users\\nikpu\\AppData\\Local\\Google\\Chrome\\User Data\\Profile 2")
    service = Service(PATH_TO_WEBDRIVER)
    options.add_argument('--disable-crash-reporter')
    options.add_argument("--disable-blink-features")
    options.add_argument("--disable-blink-features=AutomationControlled")
    driver = webdriver.Chrome(service=service, options=options)


    #парсинг всех ссылок с секторов
    with open(f"data\\base_links.txt", "r") as file:
        section_urls = file.read().split(', ')
    counter = 0
    section_urls = section_urls
    for url in section_urls:
        ua = UserAgent(browsers=['chrome'])
        us = ua.random
        options.add_argument(f"user-agent={us}")

        try:
            counter += 1
            links = parse_links(url)
            with open(f"data\\link_{counter}.txt", "a") as file:
                file.write(str(links))
        except Exception as exception:
            print(exception)


    #фильтрация и объединение всех ссылок в один файл
    links_union(len(section_urls))