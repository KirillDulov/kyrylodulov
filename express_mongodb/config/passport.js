const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const users = [];

passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
        const user = users.find(u => u.email === email);
        if (!user) return done(null, false, { message: 'User not found' });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return done(null, false, { message: 'Invalid password' });

        return done(null, user);
    }
));

passport.serializeUser((user, done) => {
    done(null, user.email);
});

passport.deserializeUser((email, done) => {
    const user = users.find(u => u.email === email);
    done(null, user);
});

module.exports = { passport, users };