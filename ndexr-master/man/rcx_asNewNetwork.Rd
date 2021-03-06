% Generated by roxygen2: do not edit by hand
% Please edit documentation in R/ndex_RCX.r
\name{rcx_asNewNetwork}
\alias{rcx_asNewNetwork}
\title{Remove all interfering NDEx artefacts from RCX object}
\usage{
rcx_asNewNetwork(rcx)
}
\arguments{
\item{rcx}{RCX object}
}
\value{
\code{\link{RCX}} object
}
\description{
Remove all interfering NDEx artefacts from RCX object
}
\details{
After a RCX object is downloaded from an NDEx server, it will contain some aspects that are not present in a newly generated network, i.e. ndexStatus', provenanceHistory' and 'status'.
Removing those aspects might be useful in some cases.
}
\examples{
## Establish a server connection
ndexcon = ndex_connect()
## Find a network and get its UUID
networks = ndex_find_networks(ndexcon,"p53")
networkId = networks[1,"externalId"]
## Get the network data 
rcx = ndex_get_network(ndexcon, networkId)
## Remove NDEx artefacts
rcx = rcx_asNewNetwork(rcx)
\dontrun{
rcxjson = rcx_toJSON(rcx)
ndex_create_network(ndexcon, rcxjson) 
}
}
\seealso{
\code{\link{rcx_fromJSON}} \code{\link{ndex_get_network}}
}
