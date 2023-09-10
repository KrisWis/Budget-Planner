from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles
import sqlite3
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import random
import secrets
from fastapi import Response
import bcrypt

conn = sqlite3.connect("users.db")
cur = conn.cursor()
cur.execute(
    """CREATE TABLE IF NOT EXISTS comments(
    id INT,
    comment TEXT);"""
)
cur.execute(
    """CREATE TABLE IF NOT EXISTS users(
    name TEXT,
    email TEXT,
    password TEXT,
    photo TEXT,
    token TEXT);"""
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


@app.get("/profile", response_class=HTMLResponse)
async def profile(request: Request):
    return templates.TemplateResponse("profile.html", {"request": request})


@app.get("/register", response_class=HTMLResponse)
async def register(request: Request):
    return templates.TemplateResponse("register.html", {"request": request})


class CreateCommentRequest(BaseModel):
    comment: str


# Это - API-запрос, который не должен быть доступен обычному юзеру, поэтому используем post.
# Запрос для создания комментария
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


# Запрос для получения комментариев
@app.get("/api/get-comments")
async def get_comments():
    # Тут мы должны получить список всех комментариев, а потом вернуть его.
    comments = cur.execute(f"SELECT comment FROM comments").fetchall()

    return comments


class DeleteCommentRequest(BaseModel):
    id: int


# Запрос для удаления комментария
@app.delete("/api/delete-comment")
async def delete_comment(comment: DeleteCommentRequest):
    # Удаляем комментарий
    cur.execute(f"DELETE FROM comments WHERE id = {comment.id}")
    conn.commit()

    return {"OK": True}


class SendLetterRequest(BaseModel):
    email: str
    username: str


# Запрос для отправки письма на почту
@app.post("/api/send-letter")
async def send_letter(user: SendLetterRequest):
    sender_email = "jennecrasov@yandex.ru"  # Адрес отправителя
    receiver_email = user.email  # Адрес получателя
    password = "qwe240408"  # Пароль для вашей почты
    code = random.randint(1, 100000)

    # Создайте объект MIMEMultipart
    message = MIMEMultipart("alternative")
    message["Subject"] = "Код для регистрации на Kopiberi"
    message["From"] = sender_email
    message["To"] = receiver_email

    # Добавьте текст письма
    text = f"Добрый день, ваш код: {code}"
    html = f"""
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" 
    "http://www.w3.org/TR/html4/loose.dtd">


    <html xmlns="http://www.w3.org/1999/xhtml>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <title>HTML LETTER</title>
        </head>
        
        <body yahoo bgcolor="#f6f8f1" style="margin: 0; padding: 0; min-width: 100%; background-color: #f6f8f1;">
            <div class="be12f8bef5b0cd1bbody" style="background-image: url(https://avatars.mds.yandex.net/get-images-cbir/106404/uarrU5A0cHq_Lq1xpj3B8g9193/ocr) !important; background-repeat: no-repeat; background-size: cover; height:100% !important;margin:0;padding:0;table-layout:fixed;width:100% !important">
                <center style="margin:0;padding:0">
                <table class="3c9134c13ccf95d0responsive-table" bgcolor="#15171e" style="background:linear-gradient( #15171e , #15171e ) #15171e;border-collapse:collapse !important"><tbody><tr><td bgcolor="#15171e" style="background:linear-gradient( #15171e , #15171e ) #15171e">
                <table class="3c9134c13ccf95d0responsive-table" align="center" bgcolor="#1a1c23" border="0" cellpadding="0" cellspacing="0" width="600" style="background:linear-gradient( #1a1c23 , #1a1c23 ) #1a1c23;border-collapse:collapse !important;border-spacing:0;margin:0 auto 0 auto;min-width:600px;width:600px;word-break:break-word;word-wrap:break-word"><tbody><tr><td class="7e1d52b93b8168b8warning-section-padding-0px" align="center">
                <table class="3c9134c13ccf95d0responsive-table" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse:collapse !important"><tbody><tr><td class="fd9cbbd47dce887cwarning-padding-10px-0px-left" bgcolor="#1a1c23" style="padding:10px 0 10px 0">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse !important;border-spacing:0;min-width:100%;width:100%;word-break:break-word;word-wrap:break-word"><tbody><tr><td class="bca632f331a9a63warning-padding-0px-10px-0px-5p-left" align="right" style="padding:0 3px 0 40px">
                </td></tr></tbody></table>
                </td></tr></tbody></table>
                <table class="3c9134c13ccf95d0responsive-table" align="center" bgcolor="#15171e" border="0" cellpadding="0" cellspacing="0" width="600" style="background:linear-gradient( #15171e , #15171e ) #15171e;border-collapse:collapse !important;border-spacing:0;margin:0 auto 0 auto;min-width:600px;width:600px;word-break:break-word;word-wrap:break-word"><tbody><tr><td class="11a353be2d7ce9b1header-section-padding-0px" align="center" style="height:50px">
                <table class="3c9134c13ccf95d0responsive-table" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse:collapse !important"><tbody><tr><td class="43aacf9c62224511header-padding-0px-center" bgcolor="#15171e">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse !important;border-spacing:0;min-width:100%;width:100%;word-break:break-word;word-wrap:break-word"><tbody><tr><td><img height="1" src="https://resize.yandex.net/mailservice?url=http%3A%2F%2Fmedia.blizzard.com%2Femails%2Fglobal%2Fshared-components%2Fspacer.gif&amp;proxy=yes&amp;key=73f44909beb4f75a3d20e308c73dd934" style="border:medium;height:1px;line-height:0;max-height:1px;min-height:1px;min-width:600px;text-decoration:none;visibility:hidden"></td></tr></tbody></table>
                </td></tr></tbody></table>
                </td></tr></tbody></table>
                <table class="3c9134c13ccf95d0responsive-table" align="center" bgcolor="#15171e" border="0" cellpadding="0" cellspacing="0" width="600" style="background:linear-gradient( #15171e , #15171e ) #15171e;border-collapse:collapse !important;border-spacing:0;margin:0 auto 0 auto;min-width:600px;width:600px;word-break:break-word;word-wrap:break-word"><tbody><tr><td class="2273e3c567a7acddheader-section-padding-25px-15px-25px" align="center">
                <table class="3c9134c13ccf95d0responsive-table" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse:collapse !important"><tbody><tr><td class="f25a5c55c9642354logo" bgcolor="#15171e" style="text-align:center;width:600px">
                <center>
                <a href="https://kopiberi.ru" target="_blank" data-link-id="1" rel="noopener noreferrer">
                <img class="" alt="Kopiberi" border="0" height="86" src="https://kopiberi.ru/uploads/images/rsz-transparent.png" width="341" style="border:0;color:#292b33;display:block;font-size:14px;height:auto;line-height:100%;margin:0 auto 0 auto;padding:0;text-decoration:none">
                </a>
                </center>
                </td></tr></tbody></table>
                </td></tr></tbody></table>
                <table class="3c9134c13ccf95d0responsive-table" align="center" bgcolor="#15171e" border="0" cellpadding="0" cellspacing="0" width="600" style="background:linear-gradient( #15171e , #15171e ) #15171e;border-collapse:collapse !important;border-spacing:0;margin:0 auto 0 auto;min-width:600px;width:600px;word-break:break-word;word-wrap:break-word"><tbody><tr><td class="11a353be2d7ce9b1header-section-padding-0px" align="center">
                <table class="3c9134c13ccf95d0responsive-table" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse:collapse !important"><tbody><tr><td class="43aacf9c62224511header-padding-0px-center" bgcolor="#15171e">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse !important;border-spacing:0;min-width:100%;width:100%;word-break:break-word;word-wrap:break-word"><tbody><tr><td class="a10b35dee9a2130eheader-padding-20px-0px-30px" style="padding:30px 0 30px 0">
                <img class="50e90ce9821b59f7img-max" border="0" height="100%" src="https://resize.yandex.net/mailservice?url=https%3A%2F%2Fbnetproduct-a.akamaihd.net%2F4a%2Fe8a0ab5204ab82c594147b5255154ea1-image-battlenet-divider.png&amp;proxy=yes&amp;key=76542b12005a85f0e2fd6394af875300" width="100%" style="border:0;color:#292b33;display:block;font-size:14px;height:auto;line-height:100%;margin:0;padding:0;text-decoration:none">
                </td></tr></tbody></table>
                </td></tr></tbody></table>
                </td></tr></tbody></table>
                <table class="3c9134c13ccf95d0responsive-table" align="center" bgcolor="#15171e" border="0" cellpadding="0" cellspacing="0" width="600" style="background:linear-gradient( #15171e , #15171e ) #15171e;border-collapse:collapse !important;border-spacing:0;margin:0 auto 0 auto;min-width:600px;width:600px;word-break:break-word;word-wrap:break-word"><tbody><tr><td class="e20efeea7458da8dbody-text-section-padding-0px-15px-10px" align="center" style="padding:0">
                <table class="3c9134c13ccf95d0responsive-table" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse:collapse !important"><tbody><tr><td bgcolor="#15171e">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse !important;border-spacing:0;min-width:100%;width:100%;word-break:break-word;word-wrap:break-word"><tbody><tr><td class="297ca11bf2833622body-text-padding-0px-5p-30px-font-12px-left" style="color:#d5d7dd;font-size:14px;font-weight:400;line-height:24px;padding:0 40px 40px 40px;text-align:left">
                <table class="" id="" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse !important"><tbody><tr><td style="color:#ffffff;font-size:24px;font-weight:700;line-height:32px">Ваш проверочный код: </td></tr></tbody></table>
                <p><em style="color:#3ed500;font-size:28px;font-style:normal;font-weight:400">{code}</em></p>
                <p> Здравствуйте, {user.username}!
                </p>
                <p> Нам пришел запрос на регистрацию аккаунта в Kopiberi. Пожалуйста, введите указанный выше код, чтобы подтвердить регистрацию данной учетной записи.
                </p>
                </p>
                С уважением, <br>Kopiberi</p>
                </td></tr></tbody></table>
                </td></tr></tbody></table>
                </td></tr></tbody></table>
                <table class="3c9134c13ccf95d0responsive-table" bgcolor="#15171e" style="background:linear-gradient( #15171e , #15171e ) #15171e;border-collapse:collapse !important"><tbody><tr><td bgcolor="#1a1c23" style="background:linear-gradient( #1a1c23 , #1a1c23 ) #1a1c23">
                <table class="3c9134c13ccf95d0responsive-table" align="center" bgcolor="#1a1c23" border="0" cellpadding="0" cellspacing="0" width="600" style="background:linear-gradient( #1a1c23 , #1a1c23 ) #1a1c23;border-collapse:collapse !important;border-spacing:0;margin:0 auto 0 auto;min-width:600px;width:600px;word-break:break-word;word-wrap:break-word"><tbody><tr><td class="a91605f3a2400a77footer-section-padding-0px" align="center" style="height:50px">
                <table class="3c9134c13ccf95d0responsive-table" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse:collapse !important"><tbody><tr><td class="1395fe85e2e1038ffooter-padding-0px-center" bgcolor="#1a1c23">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse !important;border-spacing:0;min-width:100%;width:100%;word-break:break-word;word-wrap:break-word"><tbody><tr><td>
                <img height="1" src="https://resize.yandex.net/mailservice?url=http%3A%2F%2Fmedia.blizzard.com%2Femails%2Fglobal%2Fshared-components%2Fspacer.gif&amp;proxy=yes&amp;key=73f44909beb4f75a3d20e308c73dd934" style="border:medium;height:1px;line-height:0;max-height:1px;min-height:1px;min-width:600px;text-decoration:none;visibility:hidden">
                </td></tr></tbody></table>
                </td></tr></tbody></table>
                </td></tr></tbody></table>
                <table class="3c9134c13ccf95d0responsive-table" align="center" bgcolor="#1a1c23" border="0" cellpadding="0" cellspacing="0" width="600" style="background:linear-gradient( #1a1c23 , #1a1c23 ) #1a1c23;border-collapse:collapse !important;border-spacing:0;margin:0 auto 0 auto;min-width:600px;width:600px;word-break:break-word;word-wrap:break-word"><tbody><tr><td class="33aba5c1264fac57footer-section-padding-25px-15px-25px" align="center">
                <table class="3c9134c13ccf95d0responsive-table" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse:collapse !important"><tbody><tr><td class="f25a5c55c9642354logo" bgcolor="#1a1c23">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse !important;border-spacing:0;min-width:100%;width:100%;word-break:break-word;word-wrap:break-word"><tbody><tr><td align="center" bgcolor="#1a1c23" width="600">
                <table border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse !important"><tbody><tr><td align="center
                <a href="https://kopiberi.com" target="_blank" data-link-id="3" rel="noopener noreferrer">
                <img class="" alt="Battle.net" border="0" height="85" src="https://images.squarespace-cdn.com/content/v1/6041048efe0cc52d1cc5267e/1616008397311-BA4M94YKQGILKBQWMD6G/Colors-3.png" width="121" style="border:0;color:#292b33;display:inline-block !important;font-size:14px;height:auto;line-height:100%;margin:0 auto 0 auto;padding:0;text-decoration:none">
                </a>
                </td></tr></tbody></table>
                </td></tr></tbody></table>
                </td></tr></tbody></table>
                </td></tr></tbody></table>
                <table class="3c9134c13ccf95d0responsive-table" align="center" bgcolor="#1a1c23" border="0" cellpadding="0" cellspacing="0" width="600" style="background:linear-gradient( #1a1c23 , #1a1c23 ) #1a1c23;border-collapse:collapse !important;border-spacing:0;margin:0 auto 0 auto;min-width:600px;width:600px;word-break:break-word;word-wrap:break-word"><tbody><tr><td class="6e1f39b7a67f3353footer-section-padding-10px-15px-10px" align="center" style="padding:0 0 40px 0">
                <table class="3c9134c13ccf95d0responsive-table" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse:collapse !important"><tbody><tr><td bgcolor="#1a1c23">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse !important;border-spacing:0;min-width:100%;width:100%;word-break:break-word;word-wrap:break-word"><tbody><tr><td class="97cb5bf5b44d80d8footer-padding-10px-5p-10px-left" style="color:#d5d7dd;font-size:12px;font-weight:400;line-height:18px;padding:20px 40px 0 40px;text-align:center">
                Со всеми вопросами приглашаем Вас обратиться на <a href="https://us.kopiberi.com/support/" target="_blank" style="color:#148eff !important;display:inline-block;text-decoration-line:underline !important" data-link-id="4" rel="noopener noreferrer">сайт поддержки Kopiberi</a>.
                <br>
                <a href="https://us.blizzard.com/privacy" target="_blank" style="color:#148eff !important;display:inline-block;text-decoration-line:underline !important" data-link-id="5" rel="noopener noreferrer">Политика конфиденциальности</a>
                <br>
                Kopiberi, KrisKras, Zensonaton the best
                </td></tr></tbody></table>
                </td></tr></tbody></table>
                </td></tr></tbody></table>
                <table class="3c9134c13ccf95d0responsive-table" align="center" bgcolor="#1a1c23" border="0" cellpadding="0" cellspacing="0" width="600" style="background:linear-gradient( #1a1c23 , #1a1c23 ) #1a1c23;border-collapse:collapse !important;border-spacing:0;margin:0 auto 0 auto;min-width:600px;width:600px;word-break:break-word;word-wrap:break-word"><tbody><tr><td align="center">
                <table class="3c9134c13ccf95d0responsive-table" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse:collapse !important"><tbody><tr><td bgcolor="#1a1c23">
                <table class="65bd17e3173a1186mobile-hide" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse !important"><tbody><tr><td class="65bd17e3173a1186mobile-hide" height="1" style="border:medium;font-size:0;height:1px;line-height:0;max-height:1px;min-height:1px;min-width:600px;text-decoration:none;visibility:hidden">
                <img height="1" src="https://resize.yandex.net/mailservice?url=http%3A%2F%2Fmedia.blizzard.com%2Femails%2Fglobal%2Fshared-components%2Fspacer.gif&amp;proxy=yes&amp;key=73f44909beb4f75a3d20e308c73dd934" style="border:medium;height:1px;line-height:0;max-height:1px;min-height:1px;min-width:600px;text-decoration:none;visibility:hidden">
                </td></tr></tbody></table>
                </td></tr></tbody></table>
                </td></tr></tbody></table>
                </td></tr></tbody></table>
                </td></tr></tbody></table>
                </center>
                </div>
        </body>
    </html>
    """
    part1 = MIMEText(text, "plain")
    part2 = MIMEText(html, "html")
    message.attach(part1)
    message.attach(part2)
    # Подключитесь к серверу Яндекс почты и отправьте письмо
    server = smtplib.SMTP_SSL("smtp.yandex.com", 465)
    server.login(sender_email, password)
    server.sendmail(sender_email, receiver_email, message.as_string())

    # Закройте соединение с сервером
    server.quit()

    return {"code": code}


class CreateUserRequest(BaseModel):
    name: str
    email: str
    password: str
    photo: str


# Запрос для регистрации нового пользователя
@app.post("/api/register-user")
async def register_user(user: CreateUserRequest):
    token = secrets.token_bytes(16)
    # Генерируем соль (salt)
    salt = bcrypt.gensalt()
    # Хешируем пароль с солью
    hashed_password = bcrypt.hashpw(user.password.encode("utf-8"), salt)
    cur.execute(
        f"INSERT INTO users ('name', 'email', 'password', 'photo', 'token') VALUES(?, ?, ?, ?, ?)",
        (user.name, user.email, hashed_password, user.photo, token),
    )
    conn.commit()
    return {"OK": True}


class LoginUserRequest(BaseModel):
    email: str
    password: str


# Запрос для входа юзера на сайт
@app.post("/api/login-user")
async def login_user(user: LoginUserRequest, response: Response):
    hashed_db_password = cur.execute(
        f"SELECT password FROM users WHERE email = ?", (user.email,)
    ).fetchone()[0]
    token = cur.execute(
        f"SELECT token FROM users WHERE email = ?", (user.email,)
    ).fetchone()[0]
    if bcrypt.checkpw(user.password.encode("utf-8"), hashed_db_password):
        # Устанавливаем cookie с токенами.
        response.set_cookie("access-token", token)
        return {"OK": True}

    return {"OK": False}


class GetUserRequest(BaseModel):
    token: str


# Запрос для получения данных юзера
@app.post("/api/get-user")
async def get_user(user: GetUserRequest):
    user.token = bytes(
        user.token[2:-1].replace("\\\\", "\\").encode("utf-8").decode("unicode_escape"),
        "latin1",
    )[1:-1]
    user_photo = cur.execute(
        f"SELECT photo FROM users WHERE token = ?", (user.token,)
    ).fetchone()[0]
    user_name = cur.execute(
        f"SELECT name FROM users WHERE token = ?", (user.token,)
    ).fetchone()[0]
    return {"user_photo": user_photo, "name": user_name}
