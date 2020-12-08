import hashlib
import base64
import string
import itertools
from concurrent.futures import ProcessPoolExecutor
from collections import deque

def generate_strings(length=3):
    chars = string.ascii_letters + string.digits  # "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    for item in itertools.product(chars, repeat=length):
        yield "".join(item)

gen = generate_strings(5)

def crack():
	body = gen()
	body += '.html'
	hash = base64.b64encode(hashlib.sha256(body.encode('utf-8')).digest()).lower()[:5]
	if hash.decode('utf-8') == 'index':
			print(body)


futures = deque()
with ProcessPoolExecutor(28) as exec:
	while True:
		futures.append(exec.submit(crack))
		print(futures.pop().result())