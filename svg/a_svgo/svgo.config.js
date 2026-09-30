import os
from datetime import datetime
from duckduckgo_search import DDGS

# Путь к вашему локальному хранилищу Obsidian
OBSIDIAN_VAULT_PATH = "/home/ig/ig_obs"

def search_open_calls():
    # Поисковый запрос под генеративное искусство и новые медиа
    query = "generative art open call online free submission"
    events = []
    
    print("🤖 Агент вышел на охоту за ивентами в сети...")
    
    try:
        with DDGS() as ddgs:
            results = ddgs.text(query, max_results=5)
            for r in results:
                events.append({
                    "title": r.get("title"),
                    "href": r.get("href"),
                    "body": r.get("body")
                })
    except Exception as e:
        print(f"⚠️ Ошибка при обращении к сети: {e}")
        
    print(f"🔍 Найдено результатов: {len(events)}")
    return events

def generate_markdown_report():
    # Добавляем часы и минуты, чтобы имя файла было уникальным при каждом запуске
    now_str = datetime.now().strftime("%Y-%m-%d_%H-%M")
    today_date = datetime.now().strftime("%Y-%m-%d")
    
    events = search_open_calls()
    
    content = f"""# Open Calls & Digital Events ({today_date})

* **Фильтры:** Онлайн 100%, без взносов (Free), фокус на генеративное искусство, SVG и новые медиа.
* **Контекст:** yarosh9 / Cryptophasia

## Найденные релевантные ивенты
"""

    if not events:
        content += "\n> *Поиск не вернул результатов (возможно, сработала защита сети). Попробуйте позже.*\n"
    else:
        for ev in events:
            content += f"""
* **Ивент:** [{ev['title']}]({ev['href']})
  * **Описание:** {ev['body']}
  * **Условия:** Онлайн / Требуется проверка регламента (Free)
  * **Статус:** 🔲 Не подано
"""

    os.makedirs(OBSIDIAN_VAULT_PATH, exist_ok=True)
    
    # Уникальное имя файла с таймстампом
    filename = f"Events_yarosh9_{now_str}.md"
    filepath = os.path.join(OBSIDIAN_VAULT_PATH, filename)
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
        
    print(f"✨ Готово! Создан новый файл: {filepath}\n")

if __name__ == "__main__":
    generate_markdown_report()