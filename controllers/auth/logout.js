const logout = (req, res) => {

    res.clearCookie('userSave');
    res.status(200).redirect("/");
}

module.exports = logout;