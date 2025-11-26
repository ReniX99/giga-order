## Установка и запуск

### 1. Клонируйте репозиторий

```
git clone https://github.com/ReniX99/giga-order.git
```

### 2. Создайте файл .env в корневой директории проекта
```ini
USERS_POSTGRES_USER="postgres"
USERS_POSTGRES_PASSWORD="1234"
USERS_POSTGRES_DB="users_db"

ORDERS_POSTGRES_USER="postgres"
ORDERS_POSTGRES_PASSWORD="1234"
ORDERS_POSTGRES_DB="orders_db"
```

### 3. Создайте файл .env в директории apps/api-gateway
```ini
PORT=3000

USERS_SERVICE_HOST='users-service'
USERS_SERVICE_PORT=3001

ORDERS_SERVICE_HOST='orders-service'
ORDERS_SERVICE_PORT=3002

COOKIE_NAME='no-cookies'
COOKIE_DOMAIN='localhost'
COOKIE_TTL='7d'
```

### 4. Создайте файл .env в директории apps/users
```ini
HOST='0.0.0.0'
PORT=3001

DATABASE_URL="postgresql://postgres:1234@postgres-users:5432/users_db?schema=public"

ADMIN_EMAIL="admin@gmail.com"
ADMIN_PASSWORD="12345678"

JWT_SECRET_KEY="fjdslfjsajfweiofjesiodfjsdipjfdsifjsdiofjewiofjdsjfsdkjfwejfdsjfl"
TOKEN_TTL="7d"
```

### 5. Создайте файл .env в директории apps/orders
```ini
HOST='0.0.0.0'
PORT=3002

DATABASE_URL="postgresql://postgres:1234@postgres-orders:5432/orders_db?schema=public"
```

### 6. Убедитесь, что у вас установлен Docker и Docker Compose

### 7. Запустите Docker Compose
```
docker compose up -d
```

Шлюз будет доступен по адресу: http://localhost:3000  

