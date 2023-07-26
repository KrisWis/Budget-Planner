# coding: utf-8

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles


app = FastAPI()

# Список заметок. Представь, что тут мы используем sqlite или что тебе угодно.
notes = []

# Указываем, что все шаблоны будут находиться в той же папке, что и main.py.
templates = Jinja2Templates(directory=".")

# Поключаем все статичные файлы, как main.js и указываем папку с этими файлами.
app.mount("/static", StaticFiles(directory="static"), name="static")


# Тут используется get, поскольку мы хотим, что бы пользователь увидел страницу в его браузере.
@app.get("/", response_class=HTMLResponse)
async def root(request: Request):
    # В отображении HTML-файлов FastAPI наоборот плох;
    # поскольку нужно писать такой код каждый раз, когда нужно отобразить HTML-файл.

    return templates.TemplateResponse("main.html", {"request": request})


class CreateNoteRequest(BaseModel):
    text: str


# Это - API-запрос, который не должен быть доступен обычному юзеру, поэтому используем post.
@app.post("/api/create-note")
async def create_note(note: CreateNoteRequest):
    # Представь, что мы сохранили это в БД.
    notes.append(note.text)

    # После "return" - то, что получит пользователь (т.е., сайт/фронт) в ответ на запрос.
    return {"OK": True}


@app.get("/api/get-notes")
async def get_notes():
    # Тут мы должны получить список всех заметок, а потом вернуть его.
    # Представь, что тут мы использовали реальную БД или что-то в этом духе.

    # Я захотел, что бы запрос возвращает список заметок вместе с их ID, поэтому тут такой код.
    # Ты можешь сделать по-другому, если хочешь, однако это нужно для их удаления.
    return [{"ID": i, "Text": note} for i, note in enumerate(notes)]


class DeleteNoteRequest(BaseModel):
    id: int


@app.delete("/api/delete-note")
async def delete_note(note: DeleteNoteRequest):
    # Удаляем заметку!
    # Однако, нам нужно убедиться, что такая заметка существует.

    # Представь, что тут мы использовали реальную БД или что-то в этом духе.
    if note.id >= len(notes):
        return {"OK": False, "Error": "Note not found"}

    # Удаляем заметку.
    del notes[note.id]

    return {"OK": True}
