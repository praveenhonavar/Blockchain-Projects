from hashlib import sha256

def encrypt(s):
    sh=sha256(s.encode()).hexdigest()
    return sh

p=encrypt('K-')

print(p)
