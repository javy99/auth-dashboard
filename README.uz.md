# Autentifikatsiya na'muna

Bu React.js JWT autentifikatsiyasi uchun na'munaviy/shablon kod bazasi. Autentifikatsiyani boshqarish uchun judda sodda serverdan foydalanilgan. Ushbu loyihaning asosiy e'tibori quyidagilarni amalga oshirishni ko'rsatish:

- Foydalanuvchini ro'yxatdan o'tkazish
- Foydalanuvchi login qilishi
- Foydalanuvchi logout qilishi
- Himoyalangan(Protected) sahifalar
- Autentifikatsiya barqarorligini saqlash
- Token yangilanishi (token rotation)

## Boshlash

### Backend

Avvalo [Deno](https://deno.land/) ni o'rnating.

Backend serverni ishga tushiring. U 8000-portda ishga tushadi.

```bash
cd backend
deno run --allow-net --allow-read main.ts
```

Ma'lumotlar bazasi **oddiy xotirada saqlanadigan obyekt**. Server har safar qayta ishga tushganda foydalanuvchilar ma'lumotlari o'chib ketadi. Birlamchi holatda mana shu foydalanuvchi doimo mavjud bo'ladi:

- Elektron pochta: `admin@x.com`
- Parol: `12345`

Backend `http://localhost:5173` da frontendda ishlashga sozlangan. Agar frontend URL-ni o'zgartirmoqchi bo'lsangiz, buni `backend/middleware/cors.ts` faylida `Access-Control-Allow-Origin`ni o'zgartirishingiz mumkin.

### Frontend

Frontend server 5173-portda ishga tushadi.

```bash
cd frontend
yarn install
yarn dev
```

## Texnologiyalar

### Frontend

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [React Query](https://react-query.tanstack.com/)
- [Ky.js](https://github.com/sindresorhus/ky)
- [Tailwind CSS](https://tailwindcss.com/)

### Backend

- [Deno](https://deno.land/)
- [Oak](https://oakserver.github.io/oak/)
