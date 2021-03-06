module.exports = {
    "env": {
        "browser": true,
        '$': true
    },
    "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "error",
            'tab',
            {
                'SwitchCase': 1
            }
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};