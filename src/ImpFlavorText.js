const _ = require('lodash')

const ImpFooterTexts = [
  "Never seen an imp before?",
  "Got a problem with imps, buddy?",
  "Is this really necessary?",
  "This was NOT in my contract!",
  "Yeah, yeah, yeah. Can I go now?",
  "Next time, I'll call on YOU!",
  "Argh! I feel so used!",
  "Goodbye. Thanks.",
  "What's up with moonkins?",
  "Maybe... you should go stop the jailer?",
  "Okay, okay, okay, okay, okay. BYE.",
  "...is that a mawshroom? Can I have a bite?",
  "If ya ask me, I don't trust any of those traders!",
  "Wait 'til the United Imp Union hears about THIS!",
  "Another key? Got nothing better to do?",
  "Geez... next time ask nicely?",
]

const getImpFooterText = () => {
  const randIndex = Math.floor(Math.random() * ImpFooterTexts.length)
  return ImpFooterTexts[randIndex]
}

module.exports = { getImpFooterText }
