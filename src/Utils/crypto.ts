export function openssl_random_pseudo_bytes(len: number): Uint8Array {
    return window.crypto.getRandomValues(new Uint8Array(len));
}

export function bin2hex(array: Uint8Array): string {
    return Array.from(array).map(b => b.toString(16).padStart(2, "0")).join("");
}

export function generate_state_param(): string {
    return bin2hex(openssl_random_pseudo_bytes(4));
}

export interface PKCECodes {
    verifier: string;
    challenge: string;
}

export async function generate_pkce_codes(): Promise<PKCECodes> {
    const random = bin2hex(openssl_random_pseudo_bytes(32));
    const code_verifier = base64_urlencode(hex2bin(random).toString());
    const code_challenge = base64_urlencode((await sha256(code_verifier)).toString());
    return {
        verifier: code_verifier,
        challenge: code_challenge
    };
}

async function sha256(ascii: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(ascii);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    return bin2hex(new Uint8Array(hashBuffer));
}

export function hex2bin(s: string): Uint8Array {
    const ret: number[] = [];
    for (let i = 0; i < s.length; i += 2) {
        const c = parseInt(s.substr(i, 1), 16);
        const k = parseInt(s.substr(i + 1, 1), 16);
        if (isNaN(c) || isNaN(k)) return new Uint8Array(0);
        ret.push((c << 4) | k);
    }
    return new Uint8Array(ret);
}

export function dec2hex(dec: number): string {
    return ('0' + dec.toString(16)).substr(-2);
}

export function dec2bin(arr: number[]): Uint8Array {
    return hex2bin(arr.map(dec2hex).join(''));
}

export function base64_urlencode(str: string): string {
    return btoa(unescape(encodeURIComponent(str)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

export function random_string(len: number): string {
    const arr = new Uint8Array(len);
    window.crypto.getRandomValues(arr);
    const str = base64_urlencode(dec2bin(Array.from(arr)).join(''));
    return str.substring(0, len);
}
