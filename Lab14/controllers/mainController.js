exports.getIndex = (req, res) => {
    res.render('index', { user: req.session.user });
};

exports.getLogin = (req, res) => {
    res.render('login');
};

exports.postLogin = (req, res) => {
    const username = req.body.username;
    if (username) {
        req.session.user = username;
        res.cookie('user', username, { httpOnly: true });
        res.redirect('/profile');
    } else {
        res.redirect('/login');
    }
};

exports.getProfile = (req, res) => {
    if (req.session.user) {
        res.render('profile', { user: req.session.user });
    } else {
        res.redirect('/login');
    }
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('user');
        res.redirect('/');
    });
};
