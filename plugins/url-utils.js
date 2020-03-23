const psl = require('psl')
export function extractHostname(url) {
  let hostname
  // find & remove protocol (http, ftp, etc.) and get hostname
  if (url.includes('//')) {
    hostname = url.split('/')[2]
  } else {
    hostname = url.split('/')[0]
  }
  // find & remove port number
  hostname = hostname.split(':')[0]
  // find & remove "?"
  hostname = hostname.split('?')[0]
  return hostname
}

export function extractDomain(url) {
  return psl.get(extractHostname(url))
}
