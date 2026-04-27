// Character set for encryption/decryption
const chars = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!"#$%&'()*+,-./:;<=>?@[\\]^_{|}~ \``;

function encryptText(text, key) {
    let encryptedText = "";
    for (let i = 0; i < text.length; i++) {
        const textChar = text[i];
        const keyChar = key[i % key.length];
        const textIndex = chars.indexOf(textChar);
        const keyIndex = chars.indexOf(keyChar);
        if (textIndex === -1) {
            encryptedText += textChar;
        } else {
            const newIndex = (textIndex + keyIndex) % chars.length;
            encryptedText += chars[newIndex];
        }
    }
    return encryptedText;
}

function decryptText(encryptedText, key) {
    let decryptedText = "";
    for (let i = 0; i < encryptedText.length; i++) {
        const encryptedChar = encryptedText[i];
        const keyChar = key[i % key.length];
        const encryptedIndex = chars.indexOf(encryptedChar);
        const keyIndex = chars.indexOf(keyChar);
        if (encryptedIndex === -1) {
            decryptedText += encryptedChar;
        } else {
            let newIndex = encryptedIndex - keyIndex;
            if (newIndex < 0) newIndex += chars.length;
            decryptedText += chars[newIndex];
        }
    }
    return decryptedText;
}

function validateKey(key) {
    if (!key || key.length < 3) return false;
    return [...key].every(char => chars.includes(char));
}

function updateResult(isEncrypting) {
    const text = document.getElementById('message').value;
    const key = document.getElementById('encryption-key').value;
    const keyError = document.getElementById('keyError');
    const resultEl = document.getElementById('result');

    keyError.style.display = 'none';
    if (!validateKey(key)) {
        keyError.style.display = 'block';
        resultEl.textContent = '';
        return;
    }

    let result = text ? (isEncrypting ? encryptText(text, key) : decryptText(text, key)) : '';
    resultEl.textContent = result;
}

document.getElementById('encrypt-btn').addEventListener('click', () => updateResult(true));
document.getElementById('decrypt-btn').addEventListener('click', () => updateResult(false));
document.getElementById('clear-btn').addEventListener('click', () => {
    document.getElementById('message').value = '';
    document.getElementById('encryption-key').value = '';
    document.getElementById('result').textContent = '';
    document.getElementById('keyError').style.display = 'none';
    document.getElementById('copy-status').style.display = 'none';
});

document.getElementById('copy-btn').addEventListener('click', () => {
    const result = document.getElementById('result').textContent;
    if (result) {
        navigator.clipboard.writeText(result).then(() => {
            const copyStatus = document.getElementById('copy-status');
            copyStatus.style.display = 'block';
            setTimeout(() => copyStatus.style.display = 'none', 2000);
        }).catch(() => {
            const copyStatus = document.getElementById('copy-status');
            copyStatus.textContent = 'Failed to copy!';
            copyStatus.style.display = 'block';
            setTimeout(() => {
                copyStatus.style.display = 'none';
                copyStatus.textContent = 'Copied to clipboard!';
            }, 2000);
        });
    }
});