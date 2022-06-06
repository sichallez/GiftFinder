import React from 'react'
const facebookStrategy = require('facebook-passport').facebookStrategy
const {models: {User}} = require('../db')

require("dotenv").config();

const REDIRECT_URI = process.env.REDIRECT_URI

module.exports = function(passport) {
	passport.use(new facebookStrategy({
		clientID: process.env.FACEBOOK_CLIENT_ID,
		clientSECRET: process.env.FACEBOOK_CLIENT_SECRET,
		callbackURL: REDIRECT_URI,
	}),
	async function(token, refreshToken, profile, done) {
		profile: profile_json
		try {
			const user = await User.findOrCreate({
				where: {email: profile.email},
				defaults: {
					passportId: profile.id,
					firstName: profile.first_name,
					lastName: profile.last_name,
					email: profile.email,
				},
			})
			done(null, done)
		} catch (error) {
			console.log(error)
		}
	}
	)
}


passport.serializeUser(function(user, done) {
	done(null, user.id)
})

passport.deserializeUser(function(userId, done) {
	User.findById(userId)
		.then(function(user){
			done(null, user)
		})
})