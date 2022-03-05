# PassJS-Generator

Simple and lightweight library to generate unique, secure, recoverable and customizable cryptographic passwords.

## Install

Node

```bash
npm install passjs-generator
```

## Usage

If you don't want to recover the password, you can use the key setting to generate a random password by changing the time value for each password you'll want to generate. If you change some of the other properties (salt, iv, time, keyworkd, upper, lower, number, symbol, length, minNumbers, or minSymbols), you can get a variety of similar passwords.

```javascript
import { PassJS } from 'passjs-generator';

const keyConfig: KeyConfigJS = {
  salt: 'hNhVx5CnNuLkHpcxzmyYasT5nAE6Wp7J',
  iv: 'gpT6ekXksNkK7yZk2zfU2Jc6KxqwjWja',
  time: 1646292195435, // new Date().getTime()
  keyword: 'service-name',
  upper: true,
  lower: true,
  number: true,
  symbol: true,
  length: 16,
  minNumbers: 3,
  minSymbols: 1,
};

const password = PassJS(keyConfig, 'mySecretWord');

console.log(password); // W@Nx0er0Yczutsz1

localStorage.setItem('service-password', JSON.stringify(keyConfig));
```

You can recover a password if you stored the key configuration. Only you need to remember the secret word to recover the password.

```javascript
import { PassJS } from 'passjs-generator';

const keyConfig = new KeyConfigJS(JSON.parse(localStorage.getItem('service-password')));
const password = PassJS(keyConfig, 'mySecretWord');

console.log(password); // W@Nx0er0Yczutsz1
```

## Sample generated passwords

```javascript
// letters, numbers, and symbols
'0yX%xO^6'
'V@xV5yr5$M8p202r'
'T7qvT#v5%Qs5t234x6u!yu736wn^0v6v'

// letters and numbers
'UXu2R4rt'
'56O2srS6yQzO0y2w'
'K2xwU16y21ww2116rmwslwtpx6tu47wI'

// letters
'XPoYiAcK'
'zilHZXxvUXuCROrt'
'smvXzAcFNZpvaufdrqbHuhcHayXixOog'

// numbers
'25536342288'
'5186478493555752'

// symbols
'&@^%^%&*^$*$%*&@'

// numbers and symbols
'04%^262&*&5^2$!2'

```

## Release notes

### 1.0.8

Minor changes.

### 1.0.0

Base version.
