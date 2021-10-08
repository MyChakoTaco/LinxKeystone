const _ = require('lodash')

const ImpFooterTexts = [
  "Never seen an imp before?",
  "Got a problem with imps, buddy?",
  "Was this really necessary?",
  "This was NOT in my contract!",
  "Yeah, yeah, yeah. Can I go now?",
  "Next time, I'll call on YOU!",
  "Argh! I feel so used!",
  "Goodbye. Thanks.",
  "Treants... I hate both their bark and their bite!",
  "Shouldn't you be takin' care of the jailer?",
  "Okay, okay, okay, okay, okay. I'm leavin'!",
  "...is that a mawshroom? Can I have a bite?",
  "If ya ask me, I don't trust any of those traders!",
  "Wait 'til the United Imp Union hears about THIS!",
  "Another key? Got nothing better to do?",
  "A little 'please' here and there wouldn't kill ya...",
  "I knew I should've gone with the other warlock!",
  "So yer the guy with 50 less points...",
  "Gotta go! Chicken's ready!",
  "Do you think sinstones are tasty?",
  "It's customary to tip, y'know.",
  "Release me already, I've had enough!",
  "Alright, I'm leavin'! Stop yelling!"
]

const getImpFooterText = () => {
  const randIndex = Math.floor(Math.random() * ImpFooterTexts.length)
  return ImpFooterTexts[randIndex]
}

module.exports = { getImpFooterText }
