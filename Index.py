import requests
import sys

def dir_bruteforce(base_url, wordlist):
    try:
        with open(wordlist, 'r') as file:
            paths = file.read().splitlines()
    except FileNotFoundError:
        print(f"[!] Wordlist '{wordlist}' not found.")
        return

    print(f"[*] Starting brute-force on {base_url}\n")

    for path in paths:
        url = f"{base_url}/{path}"
        try:
            response = requests.get(url, timeout=3)
            if response.status_code < 400:
                print(f"[+] Found: {url} (Status: {response.status_code})")
        except requests.exceptions.RequestException:
            pass

    print("\n[*] Scan complete.")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python3 dir_bruteforce.py <base_url> <wordlist>")
        print("Example: python3 dir_bruteforce.py http://example.com wordlist.txt")
        sys.exit(1)

    base_url = sys.argv[1].rstrip('/')
    wordlist_file = sys.argv[2]
    dir_bruteforce(base_url, wordlist_file)
