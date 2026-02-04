export const questions = [
  {
    id: 1,
    question: {
      ko: "내일 현장체험학습을 간다! 준비물은 언제 쌀까?",
      en: "Going on a field trip tomorrow! When do you pack?",
      es: "¡Mañana de excursión! ¿Cuándo haces la maleta?",
      ja: "明日は社会科見学！荷物はいつ準備する？"
    },
    type: "JP",
    answers: [
      {
        text: {
          ko: "오늘 밤에 목록을 보면서 미리 다 챙겨놓고 자야지!",
          en: "Pack everything tonight with a checklist before bed!",
          es: "¡Empacar todo esta noche con una lista antes de dormir!",
          ja: "今夜リストを見ながら全部準備して寝よう！"
        },
        type: "J"
      },
      {
        text: {
          ko: "내일 아침에 일어나서 생각나는 대로 후다닥 챙겨야지!",
          en: "Wake up tomorrow and pack whatever comes to mind!",
          es: "¡Despertar mañana y empacar lo que se me ocurra!",
          ja: "明日の朝起きて、思いついたものをパパッと準備しよう！"
        },
        type: "P"
      }
    ]
  },
  {
    id: 2,
    question: {
      ko: "선생님이 '나무'를 그려보라고 하셨어!",
      en: "Teacher asked to draw a 'Tree'!",
      es: "¡El maestro pidió dibujar un 'Árbol'!",
      ja: "先生が「木」を描いてと言ったよ！"
    },
    type: "SN",
    answers: [
      {
        text: {
          ko: "내가 직접 본 것처럼 나뭇잎이랑 나이테를 자세히 그릴 거야.",
          en: "I'll draw leaves and rings in detail just like I saw them.",
          es: "Dibujaré hojas y anillos en detalle tal como los vi.",
          ja: "私が見たままに葉っぱや年輪を詳しく描くよ。"
        },
        type: "S"
      },
      {
        text: {
          ko: "무지개색 열매가 열리는 상상 속의 신기한 나무를 그릴 거야!",
          en: "I'll draw a magical tree with rainbow fruits from my imagination!",
          es: "¡Dibujaré un árbol mágico con frutas arcoíris de mi imaginación!",
          ja: "虹色の実がなる想像の中の不思議な木を描くよ！"
        },
        type: "N"
      }
    ]
  },
  {
    id: 3,
    question: {
      ko: "방 청소를 할 때 나는...",
      en: "When cleaning my room, I...",
      es: "Cuando limpio mi habitación, yo...",
      ja: "部屋の掃除をする時、私は..."
    },
    type: "JP",
    answers: [
      {
        text: {
          ko: "장난감, 책, 옷... 구역을 나눠서 차근차근 정리하는 편!",
          en: "Organize toys, books, clothes step by step by area!",
          es: "¡Organizo juguetes, libros y ropa paso a paso por área!",
          ja: "おもちゃ、本、服... エリアを分けてコツコツ片付ける！"
        },
        type: "J"
      },
      {
        text: {
          ko: "눈에 보이는 것부터 신나게 치우다 보면 어느새 깨끗해지는 편!",
          en: "Clean up whatever I see first and it gets done eventually!",
          es: "¡Limpio lo que veo primero y eventualmente termino!",
          ja: "目に見えるものから楽しく片付けているうちに、いつの間にか綺麗になっている！"
        },
        type: "P"
      }
    ]
  },
  {
    id: 4,
    question: {
      ko: "수업 시간에 발표를 해야 해!",
      en: "I have to present in class!",
      es: "¡Tengo que presentar en clase!",
      ja: "授業中に発表しなきゃいけない！"
    },
    type: "EI",
    answers: [
      {
        text: {
          ko: "신난다! 많은 친구들 앞에서 내 생각을 말하는 건 재밌어.",
          en: "Excited! It's fun to share my thoughts with many friends.",
          es: "¡Emocionado! Es divertido compartir mis pensamientos con amigos.",
          ja: "やったー！たくさんの友達の前で自分の考えを話すのは楽しいよ。"
        },
        type: "E"
      },
      {
        text: {
          ko: "조금 떨린다... 발표 전에 미리 연습을 많이 해야겠어.",
          en: "A bit nervous... I need to practice a lot before presenting.",
          es: "Un poco nervioso... Necesito practicar mucho antes de presentar.",
          ja: "ちょっと緊張する... 発表の前にもっと練習しなきゃ。"
        },
        type: "I"
      }
    ]
  },
  {
    id: 5,
    question: {
      ko: "친구가 시무룩한 표정으로 앉아있어.",
      en: "A friend is sitting with a gloomy face.",
      es: "Un amigo está sentado con cara triste.",
      ja: "友達がしょんぼりした顔で座ってる。"
    },
    type: "TF",
    answers: [
      {
        text: {
          ko: '"무슨 일이야? 왜 기분이 안 좋아?" 하고 이유를 물어본다.',
          en: 'Ask "What\'s wrong? Why are you upset?" to find the reason.',
          es: 'Preguntar "¿Qué pasa? ¿Por qué estás triste?" para saber la razón.',
          ja: "「どうしたの？何があったの？」と理由を聞いてみる。"
        },
        type: "T"
      },
      {
        text: {
          ko: '"괜찮아?" 하고 먼저 다가가서 등을 토닥여준다.',
          en: 'Approach first asking "Are you okay?" and pat their back.',
          es: 'Acercarse primero preguntando "¿Estás bien?" y palmear su espalda.',
          ja: "「大丈夫？」と先に近づいて背中をさすってあげる。"
        },
        type: "F"
      }
    ]
  },
  {
    id: 6,
    question: {
      ko: "친구랑 놀기로 한 날, 갑자기 비가 와!",
      en: "It starts raining on the day planned to play with a friend!",
      es: "¡Empieza a llover el día planeado para jugar con un amigo!",
      ja: "友達と遊ぶ約束の日、急に雨が降ってきた！"
    },
    type: "JP",
    answers: [
      {
        text: {
          ko: "아쉽지만, 집에서 놀 수 있는 다른 계획을 바로 세워야지!",
          en: "Too bad, but I'll make a new plan to play indoors right away!",
          es: "¡Qué pena, pero haré un nuevo plan para jugar adentro de inmediato!",
          ja: "残念だけど、家で遊べる別の計画をすぐに立てなくちゃ！"
        },
        type: "J"
      },
      {
        text: {
          ko: "음... 일단 비가 그칠 때까지 기다려볼까? 아니면 다른 재밌는 걸 해볼까?",
          en: "Hmm... Should we wait for the rain to stop? Or do something else fun?",
          es: "Mmm... ¿Esperamos a que pare la lluvia? ¿O hacemos otra cosa divertida?",
          ja: "うーん... とりあえず雨が止むまで待ってみる？それとも他の面白いことをしてみる？"
        },
        type: "P"
      }
    ]
  },
  {
    id: 7,
    question: {
      ko: "새로운 장난감이 생겼어!",
      en: "Got a new toy!",
      es: "¡Tengo un juguete nuevo!",
      ja: "新しいおもちゃを買ってもらった！"
    },
    type: "SN",
    answers: [
      {
        text: {
          ko: "우선 설명서를 꼼꼼히 읽고 어떻게 작동하는지부터 확인할래.",
          en: "Read the manual carefully first to see how it works.",
          es: "Leer el manual cuidadosamente primero para ver cómo funciona.",
          ja: "まずは説明書をしっかり読んで、どうやって動くか確認するよ。"
        },
        type: "S"
      },
      {
        text: {
          ko: "이걸로 어떤 새로운 놀이를 만들 수 있을까? 상상부터 해볼래!",
          en: "Imagine what new games I can make with this first!",
          es: "¡Imaginar qué juegos nuevos puedo hacer con esto primero!",
          ja: "これでどんな新しい遊びができるかな？まずは想像してみるよ！"
        },
        type: "N"
      }
    ]
  },
  {
    id: 8,
    question: {
      ko: "칭찬을 받을 때 더 기분 좋은 말은?",
      en: "Which compliment makes you feel better?",
      es: "¿Qué cumplido te hace sentir mejor?",
      ja: "褒められる時、もっと嬉しい言葉は？"
    },
    type: "TF",
    answers: [
      {
        text: {
          ko: '"정말 똑똑하구나! 문제를 잘 해결했어!"',
          en: '"You are really smart! You solved the problem well!"',
          es: '"¡Eres muy inteligente! ¡Resolviste el problema bien!"',
          ja: "「本当に賢いね！問題をうまく解決したね！」"
        },
        type: "T"
      },
      {
        text: {
          ko: '"넌 정말 착하고 따뜻한 친구야!"',
          en: '"You are a really kind and warm friend!"',
          es: '"¡Eres un amigo muy amable y cálido!"',
          ja: "「君は本当に優しくて温かい友達だね！」"
        },
        type: "F"
      }
    ]
  },
  {
    id: 9,
    question: {
      ko: "친구랑 동화책 이야기를 하고 있어.",
      en: "Talking about a storybook with a friend.",
      es: "Hablando de un libro de cuentos con un amigo.",
      ja: "友達と絵本の話をしているよ。"
    },
    type: "SN",
    answers: [
      {
        text: {
          ko: "책에 나온 주인공이랑 사건을 중심으로 이야기하는 게 좋아.",
          en: "I like talking about the main characters and events in the book.",
          es: "Me gusta hablar de los personajes principales y eventos del libro.",
          ja: "本に出てきた主人公や出来事を中心に話すのが好き。"
        },
        type: "S"
      },
      {
        text: {
          ko: '"만약에 주인공이 다른 선택을 했다면 어땠을까?" 상상하며 이야기하는 게 좋아.',
          en: 'I like imagining "What if the character made a different choice?"',
          es: 'Me gusta imaginar "¿Y si el personaje hubiera elegido diferente?"',
          ja: "「もし主人公が違う選択をしていたらどうだったかな？」と想像しながら話すのが好き。"
        },
        type: "N"
      }
    ]
  },
  {
    id: 10,
    question: {
      ko: "주말에 뭐하고 놀까?",
      en: "What should we do this weekend?",
      es: "¿Qué deberíamos hacer este fin de semana?",
      ja: "週末は何をして遊ぼうかな？"
    },
    type: "EI",
    answers: [
      {
        text: {
          ko: "친구들이랑 다 같이 모여서 신나게 놀래!",
          en: "Gather with all my friends and play excitedly!",
          es: "¡Reunirme con todos mis amigos y jugar con emoción!",
          ja: "友達みんなで集まってワイワイ遊ぶよ！"
        },
        type: "E"
      },
      {
        text: {
          ko: "집에서 내가 좋아하는 책 읽거나 그림 그리면서 조용히 놀래!",
          en: "Play quietly at home reading my favorite book or drawing!",
          es: "¡Jugar tranquilamente en casa leyendo mi libro favorito o dibujando!",
          ja: "家で好きな本を読んだり絵を描いたりして、静かに遊ぶよ！"
        },
        type: "I"
      }
    ]
  },
  {
    id: 11,
    question: {
      ko: "모둠 과제를 하는데 의견이 달라.",
      en: "Disagreement during a group project.",
      es: "Desacuerdo durante un proyecto grupal.",
      ja: "グループ課題をしているけど意見が合わない。"
    },
    type: "TF",
    answers: [
      {
        text: {
          ko: "어떤 방법이 가장 좋은 방법인지 차근차근 따져보는 게 중요해.",
          en: "It's important to analyze step by step which method is best.",
          es: "Es importante analizar paso a paso qué método es mejor.",
          ja: "どの方法が一番良いか、順序立てて考えることが重要だよ。"
        },
        type: "T"
      },
      {
        text: {
          ko: "친구들 기분이 상하지 않게 모두가 만족하는 방법을 찾는 게 중요해.",
          en: "It's important to find a way everyone likes without hurting feelings.",
          es: "Es importante encontrar una manera que a todos les guste sin herir sentimientos.",
          ja: "友達の気分を害さないように、みんなが満足する方法を見つけることが重要だよ。"
        },
        type: "F"
      }
    ]
  },
  {
    id: 12,
    question: {
      ko: "학교 생일 파티에 갔어!",
      en: "Went to a school birthday party!",
      es: "¡Fui a una fiesta de cumpleaños escolar!",
      ja: "学校の誕生日パーティーに行ったよ！"
    },
    type: "EI",
    answers: [
      {
        text: {
          ko: "새로운 친구들한테 먼저 다가가서 말을 걸어볼 거야!",
          en: "I'll approach new friends first and talk to them!",
          es: "¡Me acercaré primero a nuevos amigos y hablaré con ellos!",
          ja: "新しい友達に自分から近づいて話しかけてみるよ！"
        },
        type: "E"
      },
      {
        text: {
          ko: "아는 친구 몇 명이랑만 이야기하는 게 더 편해.",
          en: "I'm more comfortable talking to just a few friends I know.",
          es: "Me siento más cómodo hablando solo con unos pocos amigos que conozco.",
          ja: "知ってる友達数人とだけ話す方が気が楽だな。"
        },
        type: "I"
      }
    ]
  }
];
