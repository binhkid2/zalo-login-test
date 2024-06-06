export function generateStateParam(length: number = 32): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let state = '';
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        state += characters[randomIndex];
    }
    
    return state;
}

// Helper function to base64-url encode a string without padding
function base64URLEncode(buffer: ArrayBuffer): string {
    const uint8Array = new Uint8Array(buffer);
    let binaryString = '';
    for (let i = 0; i < uint8Array.byteLength; i++) {
        binaryString += String.fromCharCode(uint8Array[i]);
    }
    return btoa(binaryString)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

// Helper function to generate a random code verifier
function generateCodeVerifier(length: number = 43): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let codeVerifier = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        codeVerifier += characters[randomIndex];
    }

    return codeVerifier;
}

// Function to generate PKCE codes
export async function generatePKCECodes(): Promise<{ verifier: string, challenge: string }> {
    const codeVerifier = generateCodeVerifier();
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const codeChallenge = base64URLEncode(hashBuffer);

    return {
        verifier: codeVerifier,
        challenge: codeChallenge
    };
}

