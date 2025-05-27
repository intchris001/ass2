import os
import requests
from tqdm import tqdm

car_list = [
    ("Toyota", "Corolla"), ("Mazda", "CX-5"), ("Ford", "Focus"), ("Honda", "Civic"), ("BMW", "X3"),
    ("Audi", "A4"), ("Mercedes", "GLA"), ("Volkswagen", "Golf"), ("Hyundai", "Elantra"), ("Kia", "Sportage"),
    ("Nissan", "Altima"), ("Chevrolet", "Malibu"), ("Subaru", "Outback"), ("Jeep", "Wrangler"), ("Tesla", "Model 3"),
    ("Lexus", "RX"), ("Volvo", "XC60"), ("Peugeot", "308"), ("Renault", "Clio"), ("Fiat", "500"),
    ("Toyota", "Camry"), ("Mazda", "Mazda3"), ("Ford", "Mondeo"), ("Honda", "Accord"), ("BMW", "X5"),
    ("Audi", "Q5"), ("Mercedes", "C-Class"), ("Volkswagen", "Passat"), ("Hyundai", "Tucson"), ("Kia", "Sorento"),
    ("Nissan", "Qashqai"), ("Chevrolet", "Cruze"), ("Subaru", "Forester"), ("Jeep", "Cherokee"), ("Tesla", "Model S"),
    ("Lexus", "ES"), ("Volvo", "V60"), ("Peugeot", "508"), ("Renault", "Megane"), ("Fiat", "Panda"),
    ("Toyota", "RAV4"), ("Mazda", "CX-3"), ("Ford", "Escape"), ("Honda", "HR-V"), ("BMW", "1 Series"),
    ("Audi", "A3"), ("Mercedes", "GLC"), ("Volkswagen", "Tiguan"), ("Hyundai", "Santa Fe"), ("Kia", "Rio")
]

PEXELS_API_KEY = "TxQCloys6F6xUjUSOAYeFOEVmX8lp5jJJjBCuX2CfOd52ZRACSIDcOyt"
PEXELS_URL = "https://api.pexels.com/v1/search"

headers = {
    "Authorization": PEXELS_API_KEY
}

save_dir = os.path.join("src", "cars")
os.makedirs(save_dir, exist_ok=True)

def download_image(url, path):
    try:
        resp = requests.get(url, timeout=10)
        if resp.status_code == 200:
            with open(path, "wb") as f:
                f.write(resp.content)
            return True
    except Exception as e:
        print(f"下载失败: {e}")
    return False

def get_car_image(brand, model):
    query = f"{brand} {model} car"
    params = {"query": query, "per_page": 1}
    resp = requests.get(PEXELS_URL, headers=headers, params=params)
    if resp.status_code == 200:
        data = resp.json()
        if data["photos"]:
            return data["photos"][0]["src"]["large"]
    # 如果没有，尝试只用品牌
    params = {"query": f"{brand} car", "per_page": 1}
    resp = requests.get(PEXELS_URL, headers=headers, params=params)
    if resp.status_code == 200:
        data = resp.json()
        if data["photos"]:
            return data["photos"][0]["src"]["large"]
    return None

if __name__ == "__main__":
    print("开始下载汽车图片...")
    for brand, model in tqdm(car_list):
        filename = f"{brand}_{model}.jpg".replace(" ", "_")
        save_path = os.path.join(save_dir, filename)
        if os.path.exists(save_path):
            continue
        url = get_car_image(brand, model)
        if url:
            if download_image(url, save_path):
                print(f"已保存: {filename}")
            else:
                print(f"下载失败: {filename}")
        else:
            print(f"未找到图片: {brand} {model}")
    print("下载完成！") 