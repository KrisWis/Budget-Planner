from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from pathlib import Path
from pydantic import BaseModel
# Union нужен для типизации в Python
from typing import Union
import asyncpg
from asyncpg import Connection
""" Для приложений серверного типа, которые обрабатывают частые запросы и 
которым требуется подключение к базе данных на короткий период времени при обработке запроса, рекомендуется использовать пул подключений. """
from asyncpg.pool import Pool
import json

# Определеяем класс базы данных
class Database:
    def __init__(self):
        # Объявляем наш пул
        self.pool: Union[Pool, None] = None

    async def create_pool(self):
        # Создаём пул
        self.pool = await asyncpg.create_pool(
            host= '127.0.0.1',
            user='postgres',
            password='1234',
            database='postgres'
        )

    # Функция для получения списка всех строк, подходящих по условию
    async def fetch(self, sql, *args):
        # acquire() делает подключение из пула
        async with self.pool.acquire() as connection:
            connection: Connection

            # Делаем саму операцию подключения
            async with connection.transaction():
                # И через подключение осуществляем вводимый запрос.
                res = await connection.fetch(sql, *args)

            return res

    # Функция для получения количества строк
    async def fetchval(self, sql, *args):
        async with self.pool.acquire() as connection:
            connection: Connection

            async with connection.transaction():
                res = await connection.fetchval(sql, *args)

            return res

    # Функция для получения одной строки, подходящей по условию
    async def fetchrow(self, sql, *args):
        async with self.pool.acquire() as connection:
            connection: Connection

            async with connection.transaction():
                res = await connection.fetchrow(sql, *args)

            return res

    # Функция для методов "INSERT, DELETE, UPDATE, CREATE".
    async def execute(self, sql, *args):
        async with self.pool.acquire() as connection:
            connection: Connection

            async with connection.transaction():
                res = await connection.execute(sql, *args)

            return res

    # Функция для создания таблиц
    async def create_tables(self):
        await self.execute('''CREATE TABLE IF NOT EXISTS surveys (
                            id SERIAL PRIMARY KEY,
                            name TEXT NOT NULL,
                            security_type TEXT,
                            survey_questions TEXT);
                            ''')
        #await self.execute("DROP TABLE surveys")
        print(await self.fetch("SELECT * from surveys"))
        print('Таблица опросов создана!')

db = Database()
app = FastAPI()
# Указываем, что все шаблоны будут находиться в той же папке, что и main.py.
templates = Jinja2Templates(directory=".")

# Поключаем все статичные файлы, как js скрипты и файлы стилей.
app.mount("/src", StaticFiles(directory="src"), name="src")

# Поключаем все файлы, находящиеся в корневой директории
root_path = Path(__file__).parent.absolute()
app.mount("/root", StaticFiles(directory=str(root_path)), name="root")


def CheckSqlInjections(text):
    if ("CREATE" or "SELECT" or "INSERT" or "UPDATE" or "DELETE" or "DROP") in text:
        return False
    return True


# Тут используется get, поскольку мы хотим, что бы пользователь увидел страницу в его браузере.
@app.get("/", response_class=HTMLResponse)
async def root(request: Request):
    # В отображении HTML-файлов FastAPI наоборот плох;
    # поскольку нужно писать такой код каждый раз, когда нужно отобразить HTML-файл.

    # Инициализируем бд
    await db.create_pool()
    await db.create_tables()

    return templates.TemplateResponse("index.html", {"request": request})


class SaveSurveyRequest(BaseModel):
    survey_name: str
    survey_security_type: str
    survey_questions: dict


# Запрос для сохранения опроса в бд
@app.post("/api/save-survey")
async def save_survey(request: SaveSurveyRequest):
    if CheckSqlInjections(request.survey_name) and CheckSqlInjections(request.survey_security_type) and CheckSqlInjections(request.survey_questions):
        print(str(request.survey_questions))
        sql = '''INSERT INTO surveys (name, security_type, survey_questions) VALUES($1, $2, $3)'''
        await db.execute(sql, request.survey_name, request.survey_security_type, str(request.survey_questions))

        # TODO: сделать для каждого опроса свой уникальный айдишник и уже из него делать ссылку.

        return {"link": f"/{request.survey_name}"}

    return {"link": "/"}