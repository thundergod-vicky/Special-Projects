import { useState } from 'react'
import { motion } from 'framer-motion'

const ANSWERS_NO = {
  english: [
    "No",
    "Are you sure?",
    "Are you really sure??",
    "Are you really realy sure???",
    "Think again?",
    "Don't believe in second chances?",
    "Why are you being so cold?",
    "Maybe we can talk about it?",
    "I am not going to ask again!",
    "Ok now this is hurting my feelings!",
    "You are now just being mean!",
    "Why are you doing this to me?",
    "Please give me a chance!",
    "I am begging you to stop!",
    "Ok, Let's just start over.."
  ],
  french: [
    "Non",
    "Tu es sûr ?",
    "Tu es vraiment sûr ??",
    "Tu es vraiment vraiment sûr ???",
    "Réfléchis encore?",
    "Tu ne crois pas aux deuxièmes chances ?",
    "Pourquoi tu es si froid?",
    "Peut-être, on peut en parler ?",
    "Je ne vais pas demander encore une fois!",
    "D'accord, maintenant ca me fait mal!",
    "Tu es juste méchant!",
    "Pourquoi tu me fais ça?",
    "Donnez-moi une chance plz!",
    "Je te supplie d'arrêter!",
    "D'accord, recommençons.."
  ],
  thai: [
    "ไม่อ่ะ",
    "แน่ใจจริงๆหรอคะ?",
    "แน่ใจจริงๆ จริงๆนะคะ?",
    "อย่าบอกนะว่านี่แน่ใจสุดๆแล้วจริงๆ ?",
    "ลองคิดดูอีกทีหน่อยสิคะ..",
    "ขอโอกาศที่สองทีค่ะ..",
    "อย่าเย็นชาสิคะ กระซิกๆ",
    "ขอร้องนะคะ",
    "น้าาาๆๆๆๆๆ",
    "เราจะร้องไห้เอานะ กระซิกๆ",
    "จะเอางี้ๆจริงหรอคะ",
    "ฮือออออ",
    "ขอโอกาศครั้งที่สองที่ค่ะ!",
    "ขอร้องละค่าาา",
    "โอเคค่ะ.. งั้นเริ่มใหม่ !"
  ]
}

const ANSWERS_YES = {
  english: "Yes",
  french: "Oui",
  thai: "เย่ คืนดีกันแล้วน้า"
}

const QUESTIONS = {
  english: "Will you be my valentine?",
  french: "Tu veux être mon valentin?",
  thai: "คืนดีกับเราได้อ่ะป่าว?"
}

const SUCCESS_MESSAGES = {
  english: "Yepppie, see you sooonnn :3",
  french: "Yepppie, à bientôt :3",
  thai: "ฮูเร่ คืนดีกันแล้วน้า :3"
}

export default function ValentineQuestion({ onFinished }) {
  const [language, setLanguage] = useState('english')
  const [noClicks, setNoClicks] = useState(0)
  const [yesSize, setYesSize] = useState(50)
  const [isSuccess, setIsSuccess] = useState(false)
  const [bannerSrc, setBannerSrc] = useState('/valentine-question/images/mid.gif')

  const handleNoClick = () => {
    if (noClicks === 0) {
      setBannerSrc('/valentine-question/images/no.gif')
    }
    
    const sizes = [40, 50, 30, 35, 45]
    const randomSize = sizes[Math.floor(Math.random() * sizes.length)]
    setYesSize(prev => prev + randomSize)
    
    if (noClicks < ANSWERS_NO[language].length - 1) {
      setNoClicks(prev => prev + 1)
    } else {
      // Loop back or show alert as in reference
      alert(ANSWERS_NO[language][noClicks])
      setNoClicks(0)
      setYesSize(50)
      setBannerSrc('/valentine-question/images/mid.gif')
    }
  }

  const handleYesClick = () => {
    setBannerSrc('/valentine-question/images/yes.gif')
    setIsSuccess(true)
  }

  return (
    <div className="valentine-question-screen">
      <div className="valentine-question-container">
        <div className="banner-gif">
          <img src={bannerSrc} alt="banner" />
        </div>
        
        {!isSuccess ? (
          <>
            <h1 className="question-heading">{QUESTIONS[language]}</h1>
            <div className="valentine-question-buttons">
              <button 
                className="yes-button"
                style={{ height: `${yesSize}px`, width: `${yesSize}px`, fontSize: `${Math.max(1, yesSize / 50)}rem` }}
                onClick={handleYesClick}
              >
                {ANSWERS_YES[language]}
              </button>
              <button 
                className="no-button"
                onClick={handleNoClick}
              >
                {ANSWERS_NO[language][noClicks]}
              </button>
            </div>
            
          </>
        ) : (
          <div className="message-container">
            <h2 className="success-message">{SUCCESS_MESSAGES[language]}</h2>
            <div className="creator-info">
              <h6>Creator: <span className="creator">vicky ;)</span></h6>
            </div>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="continue-btn"
              onClick={onFinished}
            >
              Continue ❤
            </motion.button>
          </div>
        )}
      </div>
    </div>
  )
}
