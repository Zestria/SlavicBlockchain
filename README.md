## Реализация Блокчейна
Простая реализация блокчейна на JavaScript с алгоритмом консенсуса Proof-of-Work.

### Возможности
* Создание новых блоков с криптографическим хешированием
* Добавление транзакций в пул ожидания
* Алгоритм майнинга Proof-of-Work
* Криптографическое хеширование SHA-256

### Установка зависимостей
```bash
npm install crypto-js utf8
```

### Использование
```javascript
import Blockchain from './blockchain.js';

// Инициализация блокчейна
const blockchain = new Blockchain();

// Добавление транзакции
blockchain.new_transaction("Алиса", "Боб", 5);

// Майнинг нового блока
const last_block = blockchain.chain[blockchain.chain.length - 1];
const last_proof = last_block.proof;
const proof = blockchain.proof_of_work(last_proof);

// Создание нового блока
blockchain.new_block(proof);
```

### Proof-of-Work
Реализация использует алгоритм Proof-of-Work, который требует нахождения числа, при хешировании которого с предыдущим proof получается хеш с 4 нулями в начале.
