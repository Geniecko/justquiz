let usersScore = [
    {
        name: 'Janek',
        points: 240,
    },
    {
        name: 'Adam',
        points: 120,
    },
    {
        name: 'Piotrek',
        points: 40,
    },
];

export function addUserToArray(user, points) {
    const lengthUsersScore = usersScore.length;

    for (let i = 0; i < lengthUsersScore; i++) {
        if (points > usersScore[i].points) {
            usersScore.splice(i, 0, { name: user, points: points });
            break;
        } else if (lengthUsersScore < 3) {
            usersScore.push({ name: user, points: points });
            break;
        }
    }

    while (usersScore.length > 3) {
        usersScore.pop();
    }
}

export function getUsersArray() {
    return usersScore;
}
