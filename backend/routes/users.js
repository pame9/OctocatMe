
exports.index = function(req, res){
 	if (req.session && req.session.uid) {
	    return res.redirect('/confirm');
	}
	res.render('/login');
	
};
