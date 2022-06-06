import React from 'react'
const facebookStrategy = require('facebook-passport').facebookStrategy
const {models: {User}} = require('../db')

require("dotenv").config();

const REDIRECT_URI = process.env.REDIRECT_URI

module.exports = function(passport) {
	passport.use(new facebookStrategy({
		clientID: process.env.FACEBOOK_CLIENT_ID,
		clientSECRET: process.env.FACEBOOK_CLIENT_SECRET,
		callbackURL: process.env.REDIRECT_URI
	}),
	async function(token, refreshToken, profile, done) {
		profile: profile_json
		try {
			const user = await User.findOrCreate({
				where: {email: profile.email},
				defaults: {
					
				}
			})
		} catch (error) {
			console.log(error)
		}
	}
	)
}