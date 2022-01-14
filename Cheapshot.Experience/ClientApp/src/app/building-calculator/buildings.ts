const buildings = [
	{
		"level": 0,
		"pic": "🌵",
		"name": "Cactus",
		"cost": 750,
		"coefficient": 0.50,
		"total": 750
	},
	{
		"level": 1,
		"pic": "🌵",
		"name": "Cactus",
		"cost": 375,
		"coefficient": 1.03,
		"total": 1125
	},
	{
		"level": 2,
		"pic": "🌵",
		"name": "Cactus",
		"cost": 387,
		"coefficient": 1.03,
		"total": 1512
	},
	{
		"level": 3,
		"pic": "🌵",
		"name": "Cactus",
		"cost": 399,
		"coefficient": 1.03,
		"total": 1911
	},
	{
		"level": 4,
		"pic": "🌵",
		"name": "Cactus",
		"cost": 411,
		"coefficient": 1.03,
		"total": 2322
	},
	{
		"level": 5,
		"pic": "🌵",
		"name": "Cactus",
		"cost": 424,
		"coefficient": 1.03,
		"total": 2746
	},
	{
		"level": 6,
		"pic": "🌵",
		"name": "Cactus",
		"cost": 437,
		"coefficient": 1.03,
		"total": 3183
	},
	{
		"level": 7,
		"pic": "🌵",
		"name": "Cactus",
		"cost": 451,
		"coefficient": 1.03,
		"total": 3634
	},
	{
		"level": 8,
		"pic": "🌵",
		"name": "Cactus",
		"cost": 465,
		"coefficient": 1.03,
		"total": 4099
	},
	{
		"level": 9,
		"pic": "🌵",
		"name": "Cactus",
		"cost": 479,
		"coefficient": 2,
		"total": 4578
	},
	{
		"level": 10,
		"pic": "🌻",
		"name": "Sunflower",
		"cost": 958,
		"coefficient": 0.50,
		"total": 5536
	},
	{
		"level": 11,
		"pic": "🌻",
		"name": "Sunflower",
		"cost": 479,
		"coefficient": 1.03,
		"total": 6015
	},
	{
		"level": 12,
		"pic": "🌻",
		"name": "Sunflower",
		"cost": 494,
		"coefficient": 1.03,
		"total": 6509
	},
	{
		"level": 13,
		"pic": "🌻",
		"name": "Sunflower",
		"cost": 509,
		"coefficient": 1.03,
		"total": 7018
	},
	{
		"level": 14,
		"pic": "🌻",
		"name": "Sunflower",
		"cost": 525,
		"coefficient": 1.03,
		"total": 7543
	},
	{
		"level": 15,
		"pic": "🌻",
		"name": "Sunflower",
		"cost": 541,
		"coefficient": 1.03,
		"total": 8084
	},
	{
		"level": 16,
		"pic": "🌻",
		"name": "Sunflower",
		"cost": 558,
		"coefficient": 1.03,
		"total": 8642
	},
	{
		"level": 17,
		"pic": "🌻",
		"name": "Sunflower",
		"cost": 575,
		"coefficient": 1.03,
		"total": 9217
	},
	{
		"level": 18,
		"pic": "🌻",
		"name": "Sunflower",
		"cost": 593,
		"coefficient": 1.03,
		"total": 9810
	},
	{
		"level": 19,
		"pic": "🌻",
		"name": "Sunflower",
		"cost": 611,
		"coefficient": 3,
		"total": 10421
	},
	{
		"level": 20,
		"pic": "🌹",
		"name": "Rose",
		"cost": 1833,
		"coefficient": 0.50,
		"total": 12254
	},
	{
		"level": 21,
		"pic": "🌹",
		"name": "Rose",
		"cost": 917,
		"coefficient": 1.03,
		"total": 13171
	},
	{
		"level": 22,
		"pic": "🌹",
		"name": "Rose",
		"cost": 945,
		"coefficient": 1.03,
		"total": 14116
	},
	{
		"level": 23,
		"pic": "🌹",
		"name": "Rose",
		"cost": 974,
		"coefficient": 1.03,
		"total": 15090
	},
	{
		"level": 24,
		"pic": "🌹",
		"name": "Rose",
		"cost": 1004,
		"coefficient": 1.03,
		"total": 16094
	},
	{
		"level": 25,
		"pic": "🌹",
		"name": "Rose",
		"cost": 1035,
		"coefficient": 1.03,
		"total": 17129
	},
	{
		"level": 26,
		"pic": "🌹",
		"name": "Rose",
		"cost": 1067,
		"coefficient": 1.03,
		"total": 18196
	},
	{
		"level": 27,
		"pic": "🌹",
		"name": "Rose",
		"cost": 1100,
		"coefficient": 1.03,
		"total": 19296
	},
	{
		"level": 28,
		"pic": "🌹",
		"name": "Rose",
		"cost": 1133,
		"coefficient": 1.03,
		"total": 20429
	},
	{
		"level": 29,
		"pic": "🌹",
		"name": "Rose",
		"cost": 1167,
		"coefficient": 4,
		"total": 21596
	},
	{
		"level": 30,
		"pic": "🌺",
		"name": "Hibiscus",
		"cost": 4668,
		"coefficient": 0.50,
		"total": 26264
	},
	{
		"level": 31,
		"pic": "🌺",
		"name": "Hibiscus",
		"cost": 2334,
		"coefficient": 1.03,
		"total": 28598
	},
	{
		"level": 32,
		"pic": "🌺",
		"name": "Hibiscus",
		"cost": 2405,
		"coefficient": 1.03,
		"total": 31003
	},
	{
		"level": 33,
		"pic": "🌺",
		"name": "Hibiscus",
		"cost": 2478,
		"coefficient": 1.03,
		"total": 33481
	},
	{
		"level": 34,
		"pic": "🌺",
		"name": "Hibiscus",
		"cost": 2553,
		"coefficient": 1.03,
		"total": 36034
	},
	{
		"level": 35,
		"pic": "🌺",
		"name": "Hibiscus",
		"cost": 2630,
		"coefficient": 1.03,
		"total": 38664
	},
	{
		"level": 36,
		"pic": "🌺",
		"name": "Hibiscus",
		"cost": 2709,
		"coefficient": 1.03,
		"total": 41373
	},
	{
		"level": 37,
		"pic": "🌺",
		"name": "Hibiscus",
		"cost": 2791,
		"coefficient": 1.03,
		"total": 44164
	},
	{
		"level": 38,
		"pic": "🌺",
		"name": "Hibiscus",
		"cost": 2875,
		"coefficient": 1.03,
		"total": 47039
	},
	{
		"level": 39,
		"pic": "🌺",
		"name": "Hibiscus",
		"cost": 2962,
		"coefficient": 5,
		"total": 50001
	},
	{
		"level": 40,
		"pic": "🍄",
		"name": "Mushroom",
		"cost": 14831,
		"coefficient": 0.50,
		"total": 64832
	},
	{
		"level": 41,
		"pic": "🍄",
		"name": "Mushroom",
		"cost": 7416,
		"coefficient": 1.03,
		"total": 72248
	},
	{
		"level": 42,
		"pic": "🍄",
		"name": "Mushroom",
		"cost": 7639,
		"coefficient": 1.03,
		"total": 79887
	},
	{
		"level": 43,
		"pic": "🍄",
		"name": "Mushroom",
		"cost": 7869,
		"coefficient": 1.03,
		"total": 87756
	},
	{
		"level": 44,
		"pic": "🍄",
		"name": "Mushroom",
		"cost": 8106,
		"coefficient": 1.03,
		"total": 95862
	},
	{
		"level": 45,
		"pic": "🍄",
		"name": "Mushroom",
		"cost": 8350,
		"coefficient": 1.03,
		"total": 104212
	},
	{
		"level": 46,
		"pic": "🍄",
		"name": "Mushroom",
		"cost": 8601,
		"coefficient": 1.03,
		"total": 112813
	},
	{
		"level": 47,
		"pic": "🍄",
		"name": "Mushroom",
		"cost": 8860,
		"coefficient": 1.03,
		"total": 121673
	},
	{
		"level": 48,
		"pic": "🍄",
		"name": "Mushroom",
		"cost": 9126,
		"coefficient": 1.03,
		"total": 130799
	},
	{
		"level": 49,
		"pic": "🍄",
		"name": "Mushroom",
		"cost": 9400,
		"coefficient": 6,
		"total": 140199
	},
	{
		"level": 50,
		"pic": "🌳",
		"name": "Tree",
		"cost": 56405,
		"coefficient": 0.50,
		"total": 196604
	},
	{
		"level": 51,
		"pic": "🌳",
		"name": "Tree",
		"cost": 28203,
		"coefficient": 1.03,
		"total": 224807
	},
	{
		"level": 52,
		"pic": "🌳",
		"name": "Tree",
		"cost": 29050,
		"coefficient": 1.03,
		"total": 253857
	},
	{
		"level": 53,
		"pic": "🌳",
		"name": "Tree",
		"cost": 29922,
		"coefficient": 1.03,
		"total": 283779
	},
	{
		"level": 54,
		"pic": "🌳",
		"name": "Tree",
		"cost": 30820,
		"coefficient": 1.03,
		"total": 314599
	},
	{
		"level": 55,
		"pic": "🌳",
		"name": "Tree",
		"cost": 31745,
		"coefficient": 1.03,
		"total": 346344
	},
	{
		"level": 56,
		"pic": "🌳",
		"name": "Tree",
		"cost": 32698,
		"coefficient": 1.03,
		"total": 379042
	},
	{
		"level": 57,
		"pic": "🌳",
		"name": "Tree",
		"cost": 33679,
		"coefficient": 1.03,
		"total": 412721
	},
	{
		"level": 58,
		"pic": "🌳",
		"name": "Tree",
		"cost": 34690,
		"coefficient": 1.03,
		"total": 447411
	},
	{
		"level": 59,
		"pic": "🌳",
		"name": "Tree",
		"cost": 35731,
		"coefficient": 7,
		"total": 483142
	},
	{
		"level": 60,
		"pic": "🌲",
		"name": "Fir",
		"cost": 250117,
		"coefficient": 0.50,
		"total": 733259
	},
	{
		"level": 61,
		"pic": "🌲",
		"name": "Fir",
		"cost": 125059,
		"coefficient": 1.03,
		"total": 858318
	},
	{
		"level": 62,
		"pic": "🌲",
		"name": "Fir",
		"cost": 128811,
		"coefficient": 1.03,
		"total": 987129
	},
	{
		"level": 63,
		"pic": "🌲",
		"name": "Fir",
		"cost": 132676,
		"coefficient": 1.03,
		"total": 1119805
	},
	{
		"level": 64,
		"pic": "🌲",
		"name": "Fir",
		"cost": 136657,
		"coefficient": 1.03,
		"total": 1256462
	},
	{
		"level": 65,
		"pic": "🌲",
		"name": "Fir",
		"cost": 140757,
		"coefficient": 1.03,
		"total": 1397219
	},
	{
		"level": 66,
		"pic": "🌲",
		"name": "Fir",
		"cost": 144980,
		"coefficient": 1.03,
		"total": 1542199
	},
	{
		"level": 67,
		"pic": "🌲",
		"name": "Fir",
		"cost": 149330,
		"coefficient": 1.03,
		"total": 1691529
	},
	{
		"level": 68,
		"pic": "🌲",
		"name": "Fir",
		"cost": 153810,
		"coefficient": 1.03,
		"total": 1845339
	},
	{
		"level": 69,
		"pic": "🌲",
		"name": "Fir",
		"cost": 158425,
		"coefficient": 8,
		"total": 2003764
	},
	{
		"level": 70,
		"pic": "🎄",
		"name": "El",
		"cost": 1267400,
		"coefficient": 0.50,
		"total": 3271164
	},
	{
		"level": 71,
		"pic": "🎄",
		"name": "El",
		"cost": 633700,
		"coefficient": 1.03,
		"total": 3904864
	},
	{
		"level": 72,
		"pic": "🎄",
		"name": "El",
		"cost": 652711,
		"coefficient": 1.03,
		"total": 4557575
	},
	{
		"level": 73,
		"pic": "🎄",
		"name": "El",
		"cost": 672293,
		"coefficient": 1.03,
		"total": 5229868
	},
	{
		"level": 74,
		"pic": "🎄",
		"name": "El",
		"cost": 692462,
		"coefficient": 1.03,
		"total": 5922330
	},
	{
		"level": 75,
		"pic": "🎄",
		"name": "El",
		"cost": 713236,
		"coefficient": 1.03,
		"total": 6635566
	},
	{
		"level": 76,
		"pic": "🎄",
		"name": "El",
		"cost": 734634,
		"coefficient": 1.03,
		"total": 7370200
	},
	{
		"level": 77,
		"pic": "🎄",
		"name": "El",
		"cost": 756674,
		"coefficient": 1.03,
		"total": 8126874
	},
	{
		"level": 78,
		"pic": "🎄",
		"name": "El",
		"cost": 779375,
		"coefficient": 1.03,
		"total": 8906249
	},
	{
		"level": 79,
		"pic": "🎄",
		"name": "El",
		"cost": 802757,
		"coefficient": 9,
		"total": 9709006
	},
	{
		"level": 80,
		"pic": "🗿",
		"name": "StoneGiant",
		"cost": 7226620,
		"coefficient": 0.50,
		"total": 16935626
	},
	{
		"level": 81,
		"pic": "🗿",
		"name": "StoneGiant",
		"cost": 3613310,
		"coefficient": 1.03,
		"total": 20548936
	},
	{
		"level": 82,
		"pic": "🗿",
		"name": "StoneGiant",
		"cost": 3721710,
		"coefficient": 1.03,
		"total": 24270646
	},
	{
		"level": 83,
		"pic": "🗿",
		"name": "StoneGiant",
		"cost": 3833362,
		"coefficient": 1.03,
		"total": 28104008
	},
	{
		"level": 84,
		"pic": "🗿",
		"name": "StoneGiant",
		"cost": 3948363,
		"coefficient": 1.03,
		"total": 32052371
	},
	{
		"level": 85,
		"pic": "🗿",
		"name": "StoneGiant",
		"cost": 4066814,
		"coefficient": 1.03,
		"total": 36119185
	},
	{
		"level": 86,
		"pic": "🗿",
		"name": "StoneGiant",
		"cost": 4188819,
		"coefficient": 1.03,
		"total": 40308004
	},
	{
		"level": 87,
		"pic": "🗿",
		"name": "StoneGiant",
		"cost": 4314484,
		"coefficient": 1.03,
		"total": 44622488
	},
	{
		"level": 88,
		"pic": "🗿",
		"name": "StoneGiant",
		"cost": 4443919,
		"coefficient": 1.03,
		"total": 49066407
	},
	{
		"level": 89,
		"pic": "🗿",
		"name": "StoneGiant",
		"cost": 4577237,
		"coefficient": 10,
		"total": 53643644
	},
	{
		"level": 90,
		"pic": "⛰",
		"name": "Fjäll",
		"cost": 45772370,
		"coefficient": 0.50,
		"total": 99416014
	},
	{
		"level": 91,
		"pic": "⛰",
		"name": "Fjäll",
		"cost": 22886185,
		"coefficient": 1.03,
		"total": 122302199
	},
	{
		"level": 92,
		"pic": "⛰",
		"name": "Fjäll",
		"cost": 23572771,
		"coefficient": 1.03,
		"total": 145874970
	},
	{
		"level": 93,
		"pic": "⛰",
		"name": "Fjäll",
		"cost": 24279955,
		"coefficient": 1.03,
		"total": 170154925
	},
	{
		"level": 94,
		"pic": "⛰",
		"name": "Fjäll",
		"cost": 25008354,
		"coefficient": 1.03,
		"total": 195163279
	},
	{
		"level": 95,
		"pic": "⛰",
		"name": "Fjäll",
		"cost": 25758605,
		"coefficient": 1.03,
		"total": 220921884
	},
	{
		"level": 96,
		"pic": "⛰",
		"name": "Fjäll",
		"cost": 26531364,
		"coefficient": 1.03,
		"total": 247453248
	},
	{
		"level": 97,
		"pic": "⛰",
		"name": "Fjäll",
		"cost": 27327305,
		"coefficient": 1.03,
		"total": 274780553
	},
	{
		"level": 98,
		"pic": "⛰",
		"name": "Fjäll",
		"cost": 28147125,
		"coefficient": 1.03,
		"total": 302927678
	},
	{
		"level": 99,
		"pic": "⛰",
		"name": "Fjäll",
		"cost": 28991539,
		"coefficient": 11,
		"total": 331919217
	},
	{
		"level": 100,
		"pic": "🏔",
		"name": "Snöberg",
		"cost": 318906929,
		"coefficient": 0.50,
		"total": 650826146
	},
	{
		"level": 101,
		"pic": "🏔",
		"name": "Snöberg",
		"cost": 159453465,
		"coefficient": 1.03,
		"total": 810279611
	},
	{
		"level": 102,
		"pic": "🏔",
		"name": "Snöberg",
		"cost": 164237069,
		"coefficient": 1.03,
		"total": 974516680
	},
	{
		"level": 103,
		"pic": "🏔",
		"name": "Snöberg",
		"cost": 169164182,
		"coefficient": 1.03,
		"total": 1143680862
	},
	{
		"level": 104,
		"pic": "🏔",
		"name": "Snöberg",
		"cost": 174239108,
		"coefficient": 1.03,
		"total": 1317919970
	},
	{
		"level": 105,
		"pic": "🏔",
		"name": "Snöberg",
		"cost": 179466282,
		"coefficient": 1.03,
		"total": 1497386252
	},
	{
		"level": 106,
		"pic": "🏔",
		"name": "Snöberg",
		"cost": 184850271,
		"coefficient": 1.03,
		"total": 1682236523
	},
	{
		"level": 107,
		"pic": "🏔",
		"name": "Snöberg",
		"cost": 190395780,
		"coefficient": 1.03,
		"total": 1872632303
	},
	{
		"level": 108,
		"pic": "🏔",
		"name": "Snöberg",
		"cost": 196107654,
		"coefficient": 1.03,
		"total": 2068739957
	},
	{
		"level": 109,
		"pic": "🏔",
		"name": "Snöberg",
		"cost": 201990884,
		"coefficient": 12,
		"total": 2270730841
	},
	{
		"level": 110,
		"pic": "🗻",
		"name": "富士山",
		"cost": 2423890608,
		"coefficient": 0.50,
		"total": 4694621449
	},
	{
		"level": 111,
		"pic": "🗻",
		"name": "富士山",
		"cost": 1211945304,
		"coefficient": 1.03,
		"total": 5906566753
	},
	{
		"level": 112,
		"pic": "🗻",
		"name": "富士山",
		"cost": 1248303664,
		"coefficient": 1.03,
		"total": 7154870417
	},
	{
		"level": 113,
		"pic": "🗻",
		"name": "富士山",
		"cost": 1285752774,
		"coefficient": 1.03,
		"total": 8440623191
	},
	{
		"level": 114,
		"pic": "🗻",
		"name": "富士山",
		"cost": 1324325358,
		"coefficient": 1.03,
		"total": 9764948549
	},
	{
		"level": 115,
		"pic": "🗻",
		"name": "富士山",
		"cost": 1364055119,
		"coefficient": 1.03,
		"total": 11129003668
	},
	{
		"level": 116,
		"pic": "🗻",
		"name": "富士山",
		"cost": 1404976773,
		"coefficient": 1.03,
		"total": 12533980441
	},
	{
		"level": 117,
		"pic": "🗻",
		"name": "富士山",
		"cost": 1447126077,
		"coefficient": 1.03,
		"total": 13981106518
	},
	{
		"level": 118,
		"pic": "🗻",
		"name": "富士山",
		"cost": 1490539860,
		"coefficient": 1.03,
		"total": 15471646378
	},
	{
		"level": 119,
		"pic": "🗻",
		"name": "富士山",
		"cost": 1535256056,
		"coefficient": 13,
		"total": 17006902434
	},
	{
		"level": 120,
		"pic": "🏰",
		"name": "Château",
		"cost": 19960336912,
		"coefficient": 0.50,
		"total": 36967239346
	},
	{
		"level": 121,
		"pic": "🏰",
		"name": "Château",
		"cost": 9980168456,
		"coefficient": 1.03,
		"total": 46947407802
	},
	{
		"level": 122,
		"pic": "🏰",
		"name": "Château",
		"cost": 10279573510,
		"coefficient": 1.03,
		"total": 57226981312
	},
	{
		"level": 123,
		"pic": "🏰",
		"name": "Château",
		"cost": 10587960716,
		"coefficient": 1.03,
		"total": 67814942028
	},
	{
		"level": 124,
		"pic": "🏰",
		"name": "Château",
		"cost": 10905599538,
		"coefficient": 1.03,
		"total": 78720541566
	},
	{
		"level": 125,
		"pic": "🏰",
		"name": "Château",
		"cost": 11232767525,
		"coefficient": 1.03,
		"total": 89953309091
	},
	{
		"level": 126,
		"pic": "🏰",
		"name": "Château",
		"cost": 11569750551,
		"coefficient": 1.03,
		"total": 101523059642
	},
	{
		"level": 127,
		"pic": "🏰",
		"name": "Château",
		"cost": 11916843068,
		"coefficient": 1.03,
		"total": 113439902710
	},
	{
		"level": 128,
		"pic": "🏰",
		"name": "Château",
		"cost": 12274348361,
		"coefficient": 1.03,
		"total": 125714251071
	},
	{
		"level": 129,
		"pic": "🏰",
		"name": "Château",
		"cost": 12642578812,
		"coefficient": 14,
		"total": 138356829883
	},
	{
		"level": 130,
		"pic": "🏯",
		"name": "城",
		"cost": 176996103368,
		"coefficient": 0.50,
		"total": 315352933251
	},
	{
		"level": 131,
		"pic": "🏯",
		"name": "城",
		"cost": 88498051684,
		"coefficient": 1.03,
		"total": 403850984935
	},
	{
		"level": 132,
		"pic": "🏯",
		"name": "城",
		"cost": 91152993235,
		"coefficient": 1.03,
		"total": 495003978170
	},
	{
		"level": 133,
		"pic": "🏯",
		"name": "城",
		"cost": 93887583033,
		"coefficient": 1.03,
		"total": 588891561203
	},
	{
		"level": 134,
		"pic": "🏯",
		"name": "城",
		"cost": 96704210524,
		"coefficient": 1.03,
		"total": 685595771727
	},
	{
		"level": 135,
		"pic": "🏯",
		"name": "城",
		"cost": 99605336840,
		"coefficient": 1.03,
		"total": 785201108567
	},
	{
		"level": 136,
		"pic": "🏯",
		"name": "城",
		"cost": 102593496946,
		"coefficient": 1.03,
		"total": 887794605513
	},
	{
		"level": 137,
		"pic": "🏯",
		"name": "城",
		"cost": 105671301855,
		"coefficient": 1.03,
		"total": 993465907368
	},
	{
		"level": 138,
		"pic": "🏯",
		"name": "城",
		"cost": 108841440911,
		"coefficient": 1.03,
		"total": 1102307348279
	},
	{
		"level": 139,
		"pic": "🏯",
		"name": "城",
		"cost": 112106684139,
		"coefficient": 15,
		"total": 1214414032418
	},
	{
		"level": 140,
		"pic": "🏛",
		"name": "Temple",
		"cost": 1681600262085,
		"coefficient": 0.50,
		"total": 2896014294503
	},
	{
		"level": 141,
		"pic": "🏛",
		"name": "Temple",
		"cost": 840800131043,
		"coefficient": 1.01,
		"total": 3736814425546
	},
	{
		"level": 142,
		"pic": "🏛",
		"name": "Temple",
		"cost": 849208132354,
		"coefficient": 1.01,
		"total": 4586022557900
	},
	{
		"level": 143,
		"pic": "🏛",
		"name": "Temple",
		"cost": 857700213678,
		"coefficient": 1.01,
		"total": 5443722771578
	},
	{
		"level": 144,
		"pic": "🏛",
		"name": "Temple",
		"cost": 866277215815,
		"coefficient": 1.01,
		"total": 6309999987393
	},
	{
		"level": 145,
		"pic": "🏛",
		"name": "Temple",
		"cost": 874939987974,
		"coefficient": 1.01,
		"total": 7184939975367
	},
	{
		"level": 146,
		"pic": "🏛",
		"name": "Temple",
		"cost": 883689387854,
		"coefficient": 1.01,
		"total": 8068629363221
	},
	{
		"level": 147,
		"pic": "🏛",
		"name": "Temple",
		"cost": 892526281733,
		"coefficient": 1.01,
		"total": 8961155644954
	},
	{
		"level": 148,
		"pic": "🏛",
		"name": "Temple",
		"cost": 901451544551,
		"coefficient": 1.01,
		"total": 9862607189505
	},
	{
		"level": 149,
		"pic": "🏛",
		"name": "Temple",
		"cost": 910466059997,
		"coefficient": 5,
		"total": 10773073249502
	},
	{
		"level": 150,
		"pic": "🗼",
		"name": "東京タワ",
		"cost": 4552330299985,
		"coefficient": 0.25,
		"total": 15325403549487
	},
	{
		"level": 151,
		"pic": "🗼",
		"name": "東京タワ",
		"cost": 1138082574997,
		"coefficient": 1.01,
		"total": 16463486124484
	},
	{
		"level": 152,
		"pic": "🗼",
		"name": "東京タワ",
		"cost": 1149463400747,
		"coefficient": 1.01,
		"total": 17612949525231
	},
	{
		"level": 153,
		"pic": "🗼",
		"name": "東京タワ",
		"cost": 1160958034755,
		"coefficient": 1.01,
		"total": 18773907559986
	},
	{
		"level": 154,
		"pic": "🗼",
		"name": "東京タワ",
		"cost": 1172567615103,
		"coefficient": 1.01,
		"total": 19946475175089
	},
	{
		"level": 155,
		"pic": "🗼",
		"name": "東京タワ",
		"cost": 1184293291255,
		"coefficient": 1.01,
		"total": 21130768466344
	},
	{
		"level": 156,
		"pic": "🗼",
		"name": "東京タワ",
		"cost": 1196136224168,
		"coefficient": 1.01,
		"total": 22326904690512
	},
	{
		"level": 157,
		"pic": "🗼",
		"name": "東京タワ",
		"cost": 1208097586410,
		"coefficient": 1.01,
		"total": 23535002276922
	},
	{
		"level": 158,
		"pic": "🗼",
		"name": "東京タワ",
		"cost": 1220178562275,
		"coefficient": 1.01,
		"total": 24755180839197
	},
	{
		"level": 159,
		"pic": "🗼",
		"name": "東京タワ",
		"cost": 1232380347898,
		"coefficient": 5,
		"total": 25987561187095
	},
	{
		"level": 160,
		"pic": "🏨",
		"name": "Hotel",
		"cost": 6161901739490,
		"coefficient": 0.25,
		"total": 32149462926585
	},
	{
		"level": 161,
		"pic": "🏨",
		"name": "Hotel",
		"cost": 1540475434873,
		"coefficient": 1.01,
		"total": 33689938361458
	},
	{
		"level": 162,
		"pic": "🏨",
		"name": "Hotel",
		"cost": 1555880189222,
		"coefficient": 1.01,
		"total": 35245818550680
	},
	{
		"level": 163,
		"pic": "🏨",
		"name": "Hotel",
		"cost": 1571438991115,
		"coefficient": 1.01,
		"total": 36817257541795
	},
	{
		"level": 164,
		"pic": "🏨",
		"name": "Hotel",
		"cost": 1587153381027,
		"coefficient": 1.01,
		"total": 38404410922822
	},
	{
		"level": 165,
		"pic": "🏨",
		"name": "Hotel",
		"cost": 1603024914838,
		"coefficient": 1.01,
		"total": 40007435837660
	},
	{
		"level": 166,
		"pic": "🏨",
		"name": "Hotel",
		"cost": 1619055163987,
		"coefficient": 1.01,
		"total": 41626491001647
	},
	{
		"level": 167,
		"pic": "🏨",
		"name": "Hotel",
		"cost": 1635245715627,
		"coefficient": 1.01,
		"total": 43261736717274
	},
	{
		"level": 168,
		"pic": "🏨",
		"name": "Hotel",
		"cost": 1651598172784,
		"coefficient": 1.01,
		"total": 44913334890058
	},
	{
		"level": 169,
		"pic": "🏨",
		"name": "Hotel",
		"cost": 1668114154512,
		"coefficient": 5,
		"total": 46581449044570
	},
	{
		"level": 170,
		"pic": "🏦",
		"name": "Bank",
		"cost": 8340570772560,
		"coefficient": 0.25,
		"total": 54922019817130
	},
	{
		"level": 171,
		"pic": "🏦",
		"name": "Bank",
		"cost": 2085142693140,
		"coefficient": 1.01,
		"total": 57007162510270
	},
	{
		"level": 172,
		"pic": "🏦",
		"name": "Bank",
		"cost": 2105994120072,
		"coefficient": 1.01,
		"total": 59113156630342
	},
	{
		"level": 173,
		"pic": "🏦",
		"name": "Bank",
		"cost": 2127054061273,
		"coefficient": 1.01,
		"total": 61240210691615
	},
	{
		"level": 174,
		"pic": "🏦",
		"name": "Bank",
		"cost": 2148324601886,
		"coefficient": 1.01,
		"total": 63388535293501
	},
	{
		"level": 175,
		"pic": "🏦",
		"name": "Bank",
		"cost": 2169807847905,
		"coefficient": 1.01,
		"total": 65558343141406
	},
	{
		"level": 176,
		"pic": "🏦",
		"name": "Bank",
		"cost": 2191505926385,
		"coefficient": 1.01,
		"total": 67749849067791
	},
	{
		"level": 177,
		"pic": "🏦",
		"name": "Bank",
		"cost": 2213420985649,
		"coefficient": 1.01,
		"total": 69963270053440
	},
	{
		"level": 178,
		"pic": "🏦",
		"name": "Bank",
		"cost": 2235555195506,
		"coefficient": 1.01,
		"total": 72198825248946
	},
	{
		"level": 179,
		"pic": "🏦",
		"name": "Bank",
		"cost": 2257910747462,
		"coefficient": 19,
		"total": 74456735996408
	},
	{
		"level": 180,
		"pic": "🗽",
		"name": "LibertyEnlightening",
		"cost": 42900304201778,
		"coefficient": 0.50,
		"total": 117357040198186
	},
	{
		"level": 181,
		"pic": "🗽",
		"name": "LibertyEnlightening",
		"cost": 21450152100889,
		"coefficient": 1.03,
		"total": 138807192299075
	},
	{
		"level": 182,
		"pic": "🗽",
		"name": "LibertyEnlightening",
		"cost": 22093656663916,
		"coefficient": 1.03,
		"total": 160900848962991
	},
	{
		"level": 183,
		"pic": "🗽",
		"name": "LibertyEnlightening",
		"cost": 22756466363834,
		"coefficient": 1.03,
		"total": 183657315326825
	},
	{
		"level": 184,
		"pic": "🗽",
		"name": "LibertyEnlightening",
		"cost": 23439160354749,
		"coefficient": 1.03,
		"total": 207096475681574
	},
	{
		"level": 185,
		"pic": "🗽",
		"name": "LibertyEnlightening",
		"cost": 24142335165392,
		"coefficient": 1.03,
		"total": 231238810846966
	},
	{
		"level": 186,
		"pic": "🗽",
		"name": "LibertyEnlightening",
		"cost": 24866605220354,
		"coefficient": 1.03,
		"total": 256105416067320
	},
	{
		"level": 187,
		"pic": "🗽",
		"name": "LibertyEnlightening",
		"cost": 25612603376965,
		"coefficient": 1.03,
		"total": 281718019444285
	},
	{
		"level": 188,
		"pic": "🗽",
		"name": "LibertyEnlightening",
		"cost": 26380981478274,
		"coefficient": 1.03,
		"total": 308099000922559
	},
	{
		"level": 189,
		"pic": "🗽",
		"name": "LibertyEnlightening",
		"cost": 27172410922623,
		"coefficient": 20,
		"total": 335271411845182
	},
	{
		"level": 190,
		"pic": "🕋",
		"name": "Kaaba",
		"cost": 543448218452460,
		"coefficient": 0.50,
		"total": 878719630297642
	},
	{
		"level": 191,
		"pic": "🕋",
		"name": "Kaaba",
		"cost": 271724109226230,
		"coefficient": 1.03,
		"total": 1150443739523870
	},
	{
		"level": 192,
		"pic": "🕋",
		"name": "Kaaba",
		"cost": 279875832503017,
		"coefficient": 1.03,
		"total": 1430319572026890
	},
	{
		"level": 193,
		"pic": "🕋",
		"name": "Kaaba",
		"cost": 288272107478107,
		"coefficient": 1.03,
		"total": 1718591679505000
	},
	{
		"level": 194,
		"pic": "🕋",
		"name": "Kaaba",
		"cost": 296920270702450,
		"coefficient": 1.03,
		"total": 2015511950207450
	},
	{
		"level": 195,
		"pic": "🕋",
		"name": "Kaaba",
		"cost": 305827878823523,
		"coefficient": 1.03,
		"total": 2321339829030970
	},
	{
		"level": 196,
		"pic": "🕋",
		"name": "Kaaba",
		"cost": 315002715188229,
		"coefficient": 1.03,
		"total": 2636342544219200
	},
	{
		"level": 197,
		"pic": "🕋",
		"name": "Kaaba",
		"cost": 324452796643876,
		"coefficient": 1.03,
		"total": 2960795340863070
	},
	{
		"level": 198,
		"pic": "🕋",
		"name": "Kaaba",
		"cost": 334186380543192,
		"coefficient": 1.03,
		"total": 3294981721406270
	},
	{
		"level": 199,
		"pic": "🕋",
		"name": "Kaaba",
		"cost": 344211971959488,
		"coefficient": 21,
		"total": 3639193693365750
	},
	{
		"level": 200,
		"pic": "?",
		"name": "?",
		"cost": 7228451411149250,
		"coefficient": 0.5,
		"total": 10867645104515000
	}
];

export default buildings;