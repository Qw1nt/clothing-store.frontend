import Authentication from "~/scripts/http/authentication";

const accessTokenKey = "AccessToken"

export const accessToken = ref('')

export const isAuthorized = ref(false);

export function getAuthentication(): Authentication {
    return {token: accessToken.value}
}

export function setAccessToken(token: string) {
    accessToken.value = token;
    isAuthorized.value = true;
    localStorage.setItem(accessTokenKey, token)
}

export function removeAccessToken() {
    isAuthorized.value = false;
    accessToken.value = '';
    localStorage.removeItem(accessTokenKey)
}

export function getAccessToken() {
    return localStorage.getItem(accessTokenKey)
}

export function updateAuthorization() {
    const localAccess = getAccessToken();

    if (localAccess != null) {
        accessToken.value = localAccess;
        isAuthorized.value = true;
    }
}
