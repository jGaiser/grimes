% Generated by roxygen2: do not edit by hand
% Please edit documentation in R/ndex_groups.R
\name{ndex_group_list_users}
\alias{ndex_group_list_users}
\title{Get Members of a Group}
\usage{
ndex_group_list_users(ndexcon, groupId, type = NULL, start = NULL,
  size = NULL)
}
\arguments{
\item{ndexcon}{object of class NDExConnection link{ndex_connect}}

\item{groupId}{character; unique ID (UUID) of the group}

\item{type}{character (optional); constrains the type of the returned membership. If not set (or NULL), all permission types will be returned.}

\item{start}{integer (optional); specifies that the result is the nth page of the requested data.}

\item{size}{integer (optional); specifies the number of data items in each page.}
}
\value{
List of permissions of that group or empty object
}
\description{
Get Members of a Group
}
\note{
Compatible to NDEx server version 2.0
}
\section{REST query}{

GET: ndex_config$api$group$membership$get
}

\examples{
## Establish a server connection
ndexcon = ndex_connect()
## Find a group
groups = ndex_find_groups(ndexcon,"Ideker Lab")
groupId = groups[1,"externalId"]
## Find other users of the group
# users = ndex_group_list_users(ndexcon, groupId)
# users = ndex_group_list_users (ndexcon, groupId, type='ADMIN', start=0, size=10)
}
