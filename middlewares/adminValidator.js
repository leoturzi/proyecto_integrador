function onlyAdminMiddleware (req, res, next) {
    if (res.locals.isAdmin == false) {
        res.render('404', { title : 'Houston we have an error', onlyAdminMsg : 'Esta sección es solo para administradores.'});
    } else {
        next()
    }
}
module.exports = onlyAdminMiddleware
