# TNPSC Group 4 - Practice Test Questions
# Based on Santhosh Mani Academy Model Paper

PRACTICE_TESTS = {
    "tests": [
        {
            "id": "test-01",
            "name": "மாதிரி தேர்வு 1",
            "nameEn": "Model Test 1",
            "totalQuestions": 20,
            "duration": 30,  # minutes
            "sections": [
                {
                    "id": "tamil",
                    "name": "பொதுத்தமிழ்",
                    "nameEn": "General Tamil",
                    "questions": [
                        {
                            "id": 1,
                            "question": {
                                "ta": "கூற்று: அ, இ, எ என்பன சுட்டெழுத்துக்கள்.\nகாரணம்: சுட்டுவதற்காகச் சுட்டுப்பொருள் தந்து நிற்கும் எழுத்துக்கள் சுட்டெழுத்துக்கள்.",
                                "en": "Statement: அ, இ, எ are demonstrative letters.\nReason: Letters that indicate something by providing a demonstrative meaning are called demonstrative letters."
                            },
                            "options": [
                                {"id": "A", "ta": "கூற்று சரி காரணம் தவறு", "en": "Statement correct, Reason wrong"},
                                {"id": "B", "ta": "கூற்று தவறு காரணம் சரி", "en": "Statement wrong, Reason correct"},
                                {"id": "C", "ta": "கூற்று காரணம் சரி", "en": "Both correct"},
                                {"id": "D", "ta": "கூற்று காரணம் தவறு", "en": "Both wrong"}
                            ],
                            "answer": "C",
                            "explanation": {
                                "ta": "அ, இ, எ ஆகியவை சுட்டெழுத்துக்கள். இவை அருகில் உள்ளதையும் தொலைவில் உள்ளதையும் சுட்டிக்காட்ட பயன்படுகின்றன.",
                                "en": "அ, இ, எ are demonstrative letters used to point to things near and far."
                            }
                        },
                        {
                            "id": 2,
                            "question": {
                                "ta": "ஒலி வேறுபாடு அறிந்து சரியான பொருளைத் தேர்வு செய்க:\nஅகண் - அகன்",
                                "en": "Find the correct meaning based on sound difference:\nஅகண் - அகன்"
                            },
                            "options": [
                                {"id": "A", "ta": "அண்மை - கணவன்", "en": "Nearness - Husband"},
                                {"id": "B", "ta": "கணவன் - அண்மை", "en": "Husband - Nearness"},
                                {"id": "C", "ta": "வினை முதலில் வரும் விகுதி - அருகு", "en": "Verb prefix - Near"},
                                {"id": "D", "ta": "வினை முதலில் வரும் விகுதி - கணவன்", "en": "Verb prefix - Husband"}
                            ],
                            "answer": "A",
                            "explanation": {
                                "ta": "அகண் = அண்மை (nearness), அகன் = கணவன் (husband)",
                                "en": "அகண் means nearness, அகன் means husband"
                            }
                        },
                        {
                            "id": 3,
                            "question": {
                                "ta": "சந்திப்பிழையற்ற வாக்கியத்தைத் தேர்வு செய்க:",
                                "en": "Choose the sentence without sandhi error:"
                            },
                            "options": [
                                {"id": "A", "ta": "சித்திரை திங்களில் வந்து பார்க்கும் படிக் கூறினான்.", "en": "Option A"},
                                {"id": "B", "ta": "சித்திரை திங்களில் வந்து பார்க்கும் படிக் கூறினான்.", "en": "Option B"},
                                {"id": "C", "ta": "சித்திரைத் திங்களில் வந்து பார்க்கும் படி கூறினான்.", "en": "Option C"},
                                {"id": "D", "ta": "சித்திரைத் திங்களில் வந்து பார்க்கும் படிக் கூறினான்.", "en": "Option D"}
                            ],
                            "answer": "D",
                            "explanation": {
                                "ta": "சித்திரை + திங்கள் = சித்திரைத் திங்கள் (வல்லினம் மிகும்). படி + கூறினான் = படிக் கூறினான் (வல்லினம் மிகும்)",
                                "en": "Correct sandhi application with வல்லினம் doubling"
                            }
                        },
                        {
                            "id": 4,
                            "question": {
                                "ta": "1330 குறட்பாக்கள் பளிங்குக் கற்களில் செதுக்கப்பட்டுள்ள இடம் எது?",
                                "en": "Where are the 1330 Thirukkural verses carved on marble stones?"
                            },
                            "options": [
                                {"id": "A", "ta": "திருவள்ளுவர் சிலை, கன்னியாகுமரி", "en": "Thiruvalluvar Statue, Kanyakumari"},
                                {"id": "B", "ta": "வள்ளுவர் கோட்டம், சென்னை", "en": "Valluvar Kottam, Chennai"},
                                {"id": "C", "ta": "திருவள்ளுவர் பல்கலைக்கழகம்", "en": "Thiruvalluvar University"},
                                {"id": "D", "ta": "A மற்றும் B", "en": "A and B"}
                            ],
                            "answer": "D",
                            "explanation": {
                                "ta": "கன்னியாகுமரியில் உள்ள திருவள்ளுவர் சிலை மற்றும் சென்னையில் உள்ள வள்ளுவர் கோட்டம் இரண்டிலும் 1330 குறட்பாக்களும் பளிங்குக் கல்லில் செதுக்கப்பட்டுள்ளன.",
                                "en": "Both Thiruvalluvar Statue in Kanyakumari and Valluvar Kottam in Chennai have all 1330 verses carved in marble."
                            }
                        },
                        {
                            "id": 5,
                            "question": {
                                "ta": "திருக்குறளில் கூறப்பட்டுள்ள இரண்டு மலர்கள் யாவை?",
                                "en": "What are the two flowers mentioned in Thirukkural?"
                            },
                            "options": [
                                {"id": "A", "ta": "அனிச்சம் மற்றும் தாமரை", "en": "Aniccham and Lotus"},
                                {"id": "B", "ta": "அனிச்சம் மற்றும் குவளை", "en": "Aniccham and Kuvalai"},
                                {"id": "C", "ta": "குவளை மற்றும் தாமரை", "en": "Kuvalai and Lotus"},
                                {"id": "D", "ta": "எதுவுமில்லை", "en": "None"}
                            ],
                            "answer": "A",
                            "explanation": {
                                "ta": "திருக்குறளில் அனிச்சம் மற்றும் தாமரை ஆகிய இரண்டு மலர்கள் குறிப்பிடப்பட்டுள்ளன.",
                                "en": "Thirukkural mentions Aniccham (sensitive flower) and Lotus."
                            }
                        }
                    ]
                },
                {
                    "id": "gs",
                    "name": "பொது அறிவு",
                    "nameEn": "General Studies",
                    "questions": [
                        {
                            "id": 6,
                            "question": {
                                "ta": "சென்னைவாசிகள் சங்கம் (MNA) எந்த ஆண்டில் நிறுவப்பட்டது?",
                                "en": "In which year was the Madras Native Association (MNA) founded?"
                            },
                            "options": [
                                {"id": "A", "ta": "1850", "en": "1850"},
                                {"id": "B", "ta": "1852", "en": "1852"},
                                {"id": "C", "ta": "1857", "en": "1857"},
                                {"id": "D", "ta": "1860", "en": "1860"}
                            ],
                            "answer": "B",
                            "explanation": {
                                "ta": "சென்னைவாசிகள் சங்கம் (MNA) 1852இல் கஜுலு லட்சுமிநரசு மற்றும் P. ரங்கையா ஆகியோரால் நிறுவப்பட்டது.",
                                "en": "MNA was founded in 1852 by Gazulu Lakshminarasu and P. Rangaiah."
                            }
                        },
                        {
                            "id": 7,
                            "question": {
                                "ta": "வேலூர் கலகம் எந்த ஆண்டில் நடைபெற்றது?",
                                "en": "In which year did the Vellore Mutiny take place?"
                            },
                            "options": [
                                {"id": "A", "ta": "1799", "en": "1799"},
                                {"id": "B", "ta": "1801", "en": "1801"},
                                {"id": "C", "ta": "1806", "en": "1806"},
                                {"id": "D", "ta": "1857", "en": "1857"}
                            ],
                            "answer": "C",
                            "explanation": {
                                "ta": "வேலூர் கலகம் 1806 ஜூலை 10 அன்று நடைபெற்றது. இது 1857 சிப்பாய் கலகத்திற்கு முன்னோடியாக கருதப்படுகிறது.",
                                "en": "Vellore Mutiny occurred on July 10, 1806. It is considered a precursor to the 1857 Sepoy Mutiny."
                            }
                        },
                        {
                            "id": 8,
                            "question": {
                                "ta": "கட்டபொம்மன் தூக்கிலிடப்பட்ட இடம் எது?",
                                "en": "Where was Kattabomman executed?"
                            },
                            "options": [
                                {"id": "A", "ta": "பாஞ்சாலங்குறிச்சி", "en": "Panchalamkurichi"},
                                {"id": "B", "ta": "கயத்தாறு கோட்டை", "en": "Kayatharu Fort"},
                                {"id": "C", "ta": "திருப்பத்தூர் கோட்டை", "en": "Tirupattur Fort"},
                                {"id": "D", "ta": "சிவகங்கை", "en": "Sivaganga"}
                            ],
                            "answer": "B",
                            "explanation": {
                                "ta": "கட்டபொம்மன் 1799 அக்டோபர் 17 அன்று கயத்தாறு கோட்டையில் தூக்கிலிடப்பட்டார்.",
                                "en": "Kattabomman was executed at Kayatharu Fort on October 17, 1799."
                            }
                        },
                        {
                            "id": 9,
                            "question": {
                                "ta": "'தென்னாட்டின் ஜான்சி ராணி' என்று காந்தியடிகளால் அழைக்கப்பட்டவர் யார்?",
                                "en": "Who was called the 'Jhansi Rani of South India' by Gandhiji?"
                            },
                            "options": [
                                {"id": "A", "ta": "முத்துலட்சுமி ரெட்டி", "en": "Muthulakshmi Reddy"},
                                {"id": "B", "ta": "அஞ்சலையம்மாள்", "en": "Anjalai Ammal"},
                                {"id": "C", "ta": "வேலு நாச்சியார்", "en": "Velu Nachiyar"},
                                {"id": "D", "ta": "மூவலூர் ராமமிர்தம்", "en": "Moovalur Ramamirtham"}
                            ],
                            "answer": "B",
                            "explanation": {
                                "ta": "கடலூர் அஞ்சலையம்மாளை காந்தியடிகள் 'தென்னாட்டின் ஜான்சி ராணி' என்று அழைத்தார்.",
                                "en": "Cuddalore Anjalai Ammal was called 'Jhansi Rani of South India' by Gandhiji."
                            }
                        },
                        {
                            "id": 10,
                            "question": {
                                "ta": "இந்திய தேசிய காங்கிரஸ் எந்த ஆண்டில் நிறுவப்பட்டது?",
                                "en": "In which year was the Indian National Congress founded?"
                            },
                            "options": [
                                {"id": "A", "ta": "1882", "en": "1882"},
                                {"id": "B", "ta": "1885", "en": "1885"},
                                {"id": "C", "ta": "1887", "en": "1887"},
                                {"id": "D", "ta": "1890", "en": "1890"}
                            ],
                            "answer": "B",
                            "explanation": {
                                "ta": "இந்திய தேசிய காங்கிரஸ் 1885இல் மும்பையில் நிறுவப்பட்டது.",
                                "en": "Indian National Congress was founded in 1885 in Bombay."
                            }
                        }
                    ]
                },
                {
                    "id": "aptitude",
                    "name": "திறனறிவு",
                    "nameEn": "Aptitude",
                    "questions": [
                        {
                            "id": 11,
                            "question": {
                                "ta": "ஒரு எண்ணின் 40% = 240 எனில், அந்த எண் யாது?",
                                "en": "If 40% of a number is 240, what is the number?"
                            },
                            "options": [
                                {"id": "A", "ta": "500", "en": "500"},
                                {"id": "B", "ta": "600", "en": "600"},
                                {"id": "C", "ta": "700", "en": "700"},
                                {"id": "D", "ta": "800", "en": "800"}
                            ],
                            "answer": "B",
                            "explanation": {
                                "ta": "40% × X = 240 → X = 240 × 100 / 40 = 600",
                                "en": "40% × X = 240 → X = 240 × 100 / 40 = 600"
                            }
                        },
                        {
                            "id": 12,
                            "question": {
                                "ta": "A:B = 3:4, B:C = 5:6 எனில், A:B:C = ?",
                                "en": "If A:B = 3:4 and B:C = 5:6, then A:B:C = ?"
                            },
                            "options": [
                                {"id": "A", "ta": "15:20:24", "en": "15:20:24"},
                                {"id": "B", "ta": "3:4:6", "en": "3:4:6"},
                                {"id": "C", "ta": "9:12:16", "en": "9:12:16"},
                                {"id": "D", "ta": "6:8:10", "en": "6:8:10"}
                            ],
                            "answer": "A",
                            "explanation": {
                                "ta": "A:B = 3:4 = 15:20, B:C = 5:6 = 20:24. எனவே A:B:C = 15:20:24",
                                "en": "A:B = 3:4 = 15:20, B:C = 5:6 = 20:24. Therefore A:B:C = 15:20:24"
                            }
                        },
                        {
                            "id": 13,
                            "question": {
                                "ta": "2, 5, 17, 65, ? - அடுத்த எண்ணைக் கண்டறிக",
                                "en": "Find the next number: 2, 5, 17, 65, ?"
                            },
                            "options": [
                                {"id": "A", "ta": "200", "en": "200"},
                                {"id": "B", "ta": "257", "en": "257"},
                                {"id": "C", "ta": "260", "en": "260"},
                                {"id": "D", "ta": "320", "en": "320"}
                            ],
                            "answer": "B",
                            "explanation": {
                                "ta": "முறை: ×4-3. 2×4-3=5, 5×4-3=17, 17×4-3=65, 65×4-3=257",
                                "en": "Pattern: ×4-3. 2×4-3=5, 5×4-3=17, 17×4-3=65, 65×4-3=257"
                            }
                        },
                        {
                            "id": 14,
                            "question": {
                                "ta": "ஒரு பொருளை ₹800க்கு வாங்கி ₹1000க்கு விற்றால், லாப சதவீதம் என்ன?",
                                "en": "If an item is bought for ₹800 and sold for ₹1000, what is the profit percentage?"
                            },
                            "options": [
                                {"id": "A", "ta": "20%", "en": "20%"},
                                {"id": "B", "ta": "25%", "en": "25%"},
                                {"id": "C", "ta": "30%", "en": "30%"},
                                {"id": "D", "ta": "35%", "en": "35%"}
                            ],
                            "answer": "B",
                            "explanation": {
                                "ta": "லாபம் = 1000 - 800 = 200. லாப % = (200/800) × 100 = 25%",
                                "en": "Profit = 1000 - 800 = 200. Profit % = (200/800) × 100 = 25%"
                            }
                        },
                        {
                            "id": 15,
                            "question": {
                                "ta": "கண்ணாடி பிம்பம்: APPLE என்ற சொல்லின் கண்ணாடி பிம்பம் என்ன?",
                                "en": "Mirror Image: What is the mirror image of the word APPLE?"
                            },
                            "options": [
                                {"id": "A", "ta": "ELPPA", "en": "ELPPA"},
                                {"id": "B", "ta": "ӘLPPӘ", "en": "ӘLPPӘ"},
                                {"id": "C", "ta": "Ǝ⅃ꟼꟼA", "en": "Ǝ⅃ꟼꟼA"},
                                {"id": "D", "ta": "APPEL", "en": "APPEL"}
                            ],
                            "answer": "A",
                            "explanation": {
                                "ta": "கண்ணாடி பிம்பத்தில் எழுத்துக்கள் தலைகீழாக மாறும்: APPLE → ELPPA",
                                "en": "In mirror image, letters are reversed: APPLE → ELPPA"
                            }
                        }
                    ]
                }
            ]
        }
    ]
}
