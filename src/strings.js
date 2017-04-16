let _stringsInstance = null;

// singleton strings
class _Strings {
    // define single strings
    strings = {
      app: {
        cardTitle: "Login",
        readMore: 'Read More',
        loading: "Loading"
      }
    };

    // define custom methods (like pruralize)

    constructor() {
        if (!_stringsInstance) {
            _stringsInstance = this;
        }
        return _stringsInstance;
    }

    setStrings(newStrings) {
        this.strings = newStrings;
    }
}

const s = new _Strings();

export default s;
