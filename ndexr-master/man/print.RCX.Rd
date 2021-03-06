% Generated by roxygen2: do not edit by hand
% Please edit documentation in R/ndex_RCX.r
\name{print.RCX}
\alias{print.RCX}
\title{Print a RCX object}
\usage{
\method{print}{RCX}(x, ...)
}
\arguments{
\item{x}{RCX object; stores the CX data as a named list of data.frames containing metaData and all aspects of the network.}

\item{...}{further arguments passed to or from other methods.}
}
\value{
Just prints the RCX object
}
\description{
Print a RCX object
}
\examples{
rcx = rcx_new(data.frame('@id'=c(1,2,3),n=c('Some Name','And another name',NA), r=c('HGNC:Symbol',NA,'UniProt:C3P0'), check.names=FALSE))
print(rcx)
}
\seealso{
\code{\link{rcx_fromJSON}} and \code{\link{rcx_new}}
}
