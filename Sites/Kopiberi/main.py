from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles
import sqlite3


conn = sqlite3.connect("comments.db")
cur = conn.cursor()
cur.execute(
    """CREATE TABLE IF NOT EXISTS comments(
    id INT,
    comment TEXT);"""
)

app = FastAPI()
# Указываем, что все шаблоны будут находиться в той же папке, что и main.py.
templates = Jinja2Templates(directory=".")

# Поключаем все статичные файлы, как js скрипты и файлы стилей.
app.mount("/static", StaticFiles(directory="static"), name="static")


# Тут используется get, поскольку мы хотим, что бы пользователь увидел страницу в его браузере.
@app.get("/", response_class=HTMLResponse)
async def root(request: Request):
    # В отображении HTML-файлов FastAPI наоборот плох;
    # поскольку нужно писать такой код каждый раз, когда нужно отобразить HTML-файл.

    return templates.TemplateResponse("index.html", {"request": request})


class CreateCommentRequest(BaseModel):
    comment: str


# Это - API-запрос, который не должен быть доступен обычному юзеру, поэтому используем post.
@app.post("/api/create-comment")
async def create_comment(comment: CreateCommentRequest):
    cur.execute(
        f"INSERT INTO comments ('comment', 'id') VALUES(?, ?)",
        (
            comment.comment,
            len(cur.execute(f"SELECT comment FROM comments").fetchall()) + 1,
        ),
    )
    conn.commit()

    # После "return" - то, что получит пользователь (т.е., сайт/фронт) в ответ на запрос.
    return {"OK": True}


@app.get("/api/get-comments")
async def get_comments():
    # Тут мы должны получить список всех комментариев, а потом вернуть его.
    comments = cur.execute(f"SELECT comment FROM comments").fetchall()

    return comments


class DeleteCommentRequest(BaseModel):
    id: int


@app.delete("/api/delete-comment")
async def delete_comment(comment: DeleteCommentRequest):
    # Удаляем комментарий
    cur.execute(f"DELETE FROM comments WHERE id = {comment.id}")
    conn.commit()

    return {"OK": True}
