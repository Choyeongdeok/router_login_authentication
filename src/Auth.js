const users = [
    { email: 'abc', password: '123', name: 'Kim' },
    { email: 'def', password: '456', name: 'Lee' },
    { email: 'ghi', password: '789', name: 'Park' }
] //인증용 예제

export function signIn({ email, password }) {
    const user = users.find(user => user.email === email && user.password === password);
    if (user === undefined) throw new Error();
    return user;
}