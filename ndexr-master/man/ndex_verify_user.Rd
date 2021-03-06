% Generated by roxygen2: do not edit by hand
% Please edit documentation in R/ndex_users.R
\name{ndex_verify_user}
\alias{ndex_verify_user}
\title{Verify a User}
\usage{
ndex_verify_user(ndexcon, userId, code)
}
\arguments{
\item{ndexcon}{object of class NDExConnection link{ndex_connect}}

\item{userId}{character; unique ID of the user}

\item{code}{character; Verification code sent by email}
}
\value{
string "User account XXX has been activated." when this user's account is successfully activated.
}
\description{
Verify the given user with UUID and verification code, which is set by email
}
\note{
Compatible to NDEx server version 2.0
}
\section{REST query}{

GET: ndex_config$api$user$verify
}

\examples{
## Establish a server connection
# ndexcon = ndex_connect()
## Find user and get its id
# user = ndex_find_user_byName(ndexcon, 'SomeUserName')
# userId = user$externalId
## Verify user with verification code
# ndex_verify_user(ndexcon, userId, 'Osqy11mRZ9')
## [1] "User account XXX has been activated."
NULL
}
