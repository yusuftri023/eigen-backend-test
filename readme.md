# Backend Test Case

## Entities

- Member
- Book
- memberBook(Weak Entity)

## Feature

- Basic CRUD disetiap Entity

- [Berhasil unit Test dengan line coverage threshold 80%](https://github.com/yusuftri023/eigen-backend-test/blob/master/unit-testing-SS.png)

- Menggunakan Cron Job scheduler

  - [ ] setiap hari di pukul 23:59:59 WIB akan mengecheck buku yang dipinjam Member, jika melebihi 7x24 jam Member akan diberikan flag is_penalized = true
  - [ ] setiap hari di pukul 23:59:59 WIB akan mengecheck buku terakhir yang telah dikembalikan Member, jika telah melebihi 3x24 jam Member flag is_penalized diset false

- Dokumentasi API menggunakan swagger dapat dicoba melalui endpoint /api-docs
- Sebisa mungkin mengimplementasikan pattern DDD

---

# ALGORITMA

Hasil test algoritma dapat dilihat di folder [test-algoritma](https://github.com/yusuftri023/eigen-backend-test/tree/master/test-algoritma)
