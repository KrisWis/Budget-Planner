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
import dotenv
import os
from pathlib import Path

dotenv.load_dotenv()  # Загружаем файл .env

conn = sqlite3.connect("users.db")
cur = conn.cursor()
# Бд для комментариев
cur.execute(
    """CREATE TABLE IF NOT EXISTS comments(
    id INT,
    comment TEXT);"""
)
# Бд для донатов
cur.execute(
    """CREATE TABLE IF NOT EXISTS donate_answers(
    id INT,
    donate_answer TEXT);"""
)
# Бд для юзеров
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

    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/profile", response_class=HTMLResponse)
async def profile(request: Request):
    return templates.TemplateResponse("profile.html", {"request": request})


@app.get("/register", response_class=HTMLResponse)
async def register(request: Request):
    return templates.TemplateResponse("register.html", {"request": request})


@app.get("/password_recovery", response_class=HTMLResponse)
async def password_recovery(request: Request):
    return templates.TemplateResponse("password_recovery.html", {"request": request})


@app.get("/reset-password/{path_param:path}", response_class=HTMLResponse)
async def reset_password(request: Request):
    return templates.TemplateResponse("reset_password.html", {"request": request})


class CreateCommentRequest(BaseModel):
    comment: str


# Это - API-запрос, который не должен быть доступен обычному юзеру, поэтому используем post.
# Запрос для создания комментария
@app.post("/api/create-comment")
async def create_comment(comment: CreateCommentRequest):
    if CheckSqlInjections(comment.comment):
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

    return {"OK": False}


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
    password = os.environ["EMAIL_PASSWORD"]  # Пароль для вашей почты
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
    if (
        CheckSqlInjections(user.name)
        or CheckSqlInjections(user.email)
        or CheckSqlInjections(user.password)
    ):
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

    return {"OK": False}


class LoginUserRequest(BaseModel):
    email: str
    password: str
    remember: bool


# Запрос для входа юзера на сайт
@app.post("/api/login-user")
async def login_user(user: LoginUserRequest, response: Response):
    if CheckSqlInjections(user.email) or CheckSqlInjections(user.password):
        if (user.email,) in cur.execute(f"SELECT email FROM users").fetchall():
            hashed_db_password = cur.execute(
                f"SELECT password FROM users WHERE email = ?", (user.email,)
            ).fetchone()[0]
            token = cur.execute(
                f"SELECT token FROM users WHERE email = ?", (user.email,)
            ).fetchone()[0]
            if bcrypt.checkpw(user.password.encode("utf-8"), hashed_db_password):
                # Устанавливаем cookie с токенами.
                if user.remember:
                    response.set_cookie(
                        "access-token", token, max_age=30 * 24 * 60 * 60
                    )
                else:
                    response.set_cookie("access-token", token)
                return {"PasswordError": False, "EmailError": False}
            else:
                return {"PasswordError": True, "EmailError": False}
        else:
            return {"EmailError": True, "PasswordError": False}

    return {"EmailError": True, "PasswordError": True}


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
    return {"user_photo": user_photo, "user_name": user_name}


class sendLetterForRecoveryPassword(BaseModel):
    email: str


# Запрос для отправки письма на почту для восстановления пароля
@app.post("/api/send-letter-for-recovery-password")
async def send_letter_for_recovery_password(
    user: sendLetterForRecoveryPassword, response: Response
):
    if CheckSqlInjections(user.email):
        if (user.email,) in cur.execute(f"SELECT email FROM users").fetchall():
            sender_email = "jennecrasov@yandex.ru"  # Адрес отправителя
            receiver_email = user.email  # Адрес получателя
            password = os.environ["EMAIL_PASSWORD"]  # Пароль для вашей почты
            token = secrets.token_bytes(16)
            cur.execute(
                "UPDATE users SET token = ? WHERE email = ?", (token, user.email)
            )
            conn.commit()
            response.set_cookie("access-token", token)

            # Создайте объект MIMEMultipart
            message = MIMEMultipart("alternative")
            message["Subject"] = "Восстановления пароля на Kopiberi"
            message["From"] = sender_email
            message["To"] = receiver_email

            # Добавьте текст письма
            text = "Чтобы восстановить пароль, нажмите на кнопку в письме"
            html = f"""
            <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" 
            "http://www.w3.org/TR/html4/loose.dtd">


            <html xmlns="http://www.w3.org/1999/xhtml>
                <head>
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                    <title>HTML LETTER</title>
                </head>
                
                <body yahoo bgcolor="#f6f8f1" style="margin: 0; padding: 0; min-width: 100%; background-color: #f6f8f1;">
                    <div class="be12f8bef5b0cd1bbody" style="background-image: url(static/images/background.png) !important; background-repeat: no-repeat; background-size: cover; height:100% !important;margin:0;padding:0;table-layout:fixed;width:100% !important">
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
                        <img alt="Kopiberi" border="0" height="86" src="https://kopiberi.ru/uploads/images/rsz-transparent.png" width="341" style="border:0;color:#292b33;display:block;font-size:14px;height:auto;line-height:100%;margin:0 auto 0 auto;padding:0;text-decoration:none">
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
                        <p> Нам пришел запрос на восстановление пароля в Kopiberi. Пожалуйста, нажмите на кнопку ниже, если совершали данное действие. В противном случае проигнорируйте это сообщение.
                        </p>
                        </p>
                        С уважением, <br>Kopiberi</p>
                        </td></tr></tbody></table>
                        <table border="0" cellpadding="0" cellspacing="0" style="margin-left: 40px; box-sizing:border-box;font-family:'-apple-system' , 'blinkmacsystemfont' , 'segoe ui' , 'roboto' , 'helvetica' , 'arial' , sans-serif , 'apple color emoji' , 'segoe ui emoji' , 'segoe ui symbol'"><tbody><tr><td style="box-sizing:border-box;font-family:'-apple-system' , 'blinkmacsystemfont' , 'segoe ui' , 'roboto' , 'helvetica' , 'arial' , sans-serif , 'apple color emoji' , 'segoe ui emoji' , 'segoe ui symbol'">
                        <a class="815d836d1c464417button ffe4fb831b550accbutton-blue" href="http://127.0.0.1:8000/reset-password/{token}" rel="noopener noreferrer" target="_blank" style="background-color:#2d3748;border-color:#2d3748;border-radius:4px;border-style:solid;border-width:8px 18px 8px 18px;box-sizing:border-box;color:#fff;display:inline-block;font-family:'-apple-system' , 'blinkmacsystemfont' , 'segoe ui' , 'roboto' , 'helvetica' , 'arial' , sans-serif , 'apple color emoji' , 'segoe ui emoji' , 'segoe ui symbol';overflow:hidden;text-decoration:none" data-link-id="2">Восстановить пароль</a>
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

            return {"OK": True}
        else:
            return {"OK": False}

    return {"OK": False}


class CheckPasswordRequest(BaseModel):
    token: str
    password: str


# Запрос для проверки нового и старого пароля
@app.post("/reset-password/api/check-password")
async def check_password(user: CheckPasswordRequest):
    if CheckSqlInjections(user.password):
        user.token = bytes(
            user.token[2:-1]
            .replace("\\\\", "\\")
            .encode("utf-8")
            .decode("unicode_escape"),
            "latin1",
        )[1:-1]
        hashed_db_password = cur.execute(
            f"SELECT password FROM users WHERE token = ?", (user.token,)
        ).fetchone()[0]
        if bcrypt.checkpw(user.password.encode("utf-8"), hashed_db_password):
            return {"Passwords_equal": True}

        return {"Passwords_equal": False}

    return {"OK": False}


class UpdateUserPasswordRequest(BaseModel):
    token: str
    password: str


# Запрос для проверки нового и старого пароля
@app.post("/reset-password/api/update-user-password")
async def update_user_password(user: UpdateUserPasswordRequest):
    if CheckSqlInjections(user.password):
        user.token = bytes(
            user.token[2:-1]
            .replace("\\\\", "\\")
            .encode("utf-8")
            .decode("unicode_escape"),
            "latin1",
        )[1:-1]
        if (user.token,) in cur.execute(f"SELECT token FROM users").fetchall():
            # Генерируем соль (salt)
            salt = bcrypt.gensalt()
            # Хешируем пароль с солью
            hashed_password = bcrypt.hashpw(user.password.encode("utf-8"), salt)
            cur.execute(
                "UPDATE users SET password = ? WHERE token = ?",
                (hashed_password, user.token),
            )
            conn.commit()
            return {"OK": True}
    return {"OK": False}


class DeleteUserRequest(BaseModel):
    token: str


# Запрос для удаления аккаунта пользователя
@app.post("/api/delete-user")
async def delete_user(user: DeleteUserRequest):
    user.token = bytes(
        user.token[2:-1].replace("\\\\", "\\").encode("utf-8").decode("unicode_escape"),
        "latin1",
    )[1:-1]
    cur.execute("DELETE FROM users WHERE token = ?", (user.token,))
    conn.commit()
    return {"OK": True}


class CheckEmailRequest(BaseModel):
    email: str


# Запрос для проверки повторимости почты
@app.post("/api/check-email")
async def check_email(user: CheckEmailRequest):
    if CheckSqlInjections(user.email):
        emails = cur.execute(f"SELECT email FROM users").fetchall()
        if (user.email,) not in emails:
            return {"Email_new": True}

        return {"Email_new": False}

    return {"Email_new": False}


class CreateDonateAnswerRequest(BaseModel):
    donate_answer: str


# Запрос для создания ответа на донат
@app.post("/api/create-donate-answer")
async def create_donate_answer(donate_answer: CreateDonateAnswerRequest):
    if CheckSqlInjections(donate_answer.donate_answer):
        cur.execute(
            f"INSERT INTO comments ('comment', 'id') VALUES(?, ?)",
            (
                donate_answer.donate_answer,
                len(cur.execute(f"SELECT donate_answer FROM donate_answers").fetchall())
                + 1,
            ),
        )
        conn.commit()

        # После "return" - то, что получит пользователь (т.е., сайт/фронт) в ответ на запрос.
        return {"OK": True}

    return {"OK": False}
