/* ════════════════════════════════════════════════════════════════
   سوفتارا TV v3.0.6 — منطق صفحة Softara Live TV (البث المباشر)
   هذه الصفحة للقنوات المباشرة فقط:
   تصنيفات مشتقة آليًا من البيانات · بحث فوري · تنقّل سابق/تالي ·
   لوحة قنوات للهاتف ولوح جانبي للحاسب · تشغيل تلقائي مكتوم للقناة المميزة
   ★ يعتمد على: softara-shared.js ثم softara-player.js ثم هذا الملف
   ════════════════════════════════════════════════════════════════ */
(function(){
'use strict';
var S=window.STV, DATA=window.STV_LIVE_DATA;
if(!S||!DATA){
  document.addEventListener('DOMContentLoaded',function(){
    var box=document.getElementById('stvChListM');
    if(box)box.innerHTML='<div class="stv-empty">تعذّر تحميل بيانات القنوات من الشبكة.<br>تحقق من اتصال الإنترنت ثم أعد تحميل الصفحة.</div>';
  });
  return;
}
var d=S.d,w=S.w,$=S.$,esc=S.esc,icon=S.icon,fmtT=S.fmtT;

/* ─────────── الحالة ─────────── */
var state={ query:'', chFilter:'الكل', grp:'عربية' };

/* ─── فصل القنوات إلى مجموعات (v3.0.6) ───
   المرجع: لغة البث المسجلة لكل قناة في فهرس iptv-org (feeds) + لغة البيانات + مراجعة يدوية للملتبس.
   عربية = لغة البث الأولى عربية · غير محدد/متعددة = لغات مختلطة أو لا مصدر موثوق للغة · أجنبية = الباقي.
   (لا يُستخدم بلد القناة ولا حروف الاسم كدليل لغة.) القنوات المضافة لاحقًا تُصنَّف «غير محدد» حتى تُراجع وتُدرج في إحدى القائمتين. */
var GRP_AR=["ch-aj","ch-ajdoc","ch-alarabiya","ch-sna","ch-dw","ch-trt","ch-hadath","ch-asharqnews","ch-ekhbariya","ch-alarabiya-biz","ch-cnbc-arabia","ch-f24-ar","ch-ajm","ch-kurdsat-news","ch-al24","ch-ktv-news","ch-medi1","x-AlAlamAlYawm.sa","x-AlMasarTV.ly","x-AlMasirah.ye","x-AlNajahNews.ps","x-AlYaumTV.ae","x-AlghadeerTV.iq","x-AlmahriahTV.tr","x-AltaghierTV.jo","x-BBCArabic.uk","x-CGTNArabic.cn","x-DijlahTV.iq","x-HalabTodayTV.sy","x-i24NEWSArabic.il","x-Medi1TVMaghreb.ma","x-MekameleenTV.tr","x-PalestineAlYawm.lb","x-PalestineToday.ps","x-SerajTV.ps","x-VoiceofLebanon.lb","x-WelatTV.sy","ch-ktv-sport","ch-ktv-sport-plus","ch-oman-sport","x-BahrainSports1.bh","x-BahrainSports2.bh","x-Prime.sy","x-AlIraqiaSport","ch-aflam","x-MixHollywood.eg","x-ThikrayatTV.sa","x-MBCDrama","ch-babalhara","ch-mbc-drama","ch-mbc-masr-drama","ch-jordan-drama","x-Maraya.sa","x-MBCDramaUSA","ch-sat7kids","ch-atfal","x-AlSouriyaTV.sy","x-KoogiTV.eg","x-MBC3USA.us","x-SpacetoonArabic.ae","x-GodStandsKidsClubTVArabic","ch-quran-qatar","ch-iqraa","ch-iqraa-quran","ch-alistiqama","ch-assirat","ch-maaref","x-ABNsat.iq","x-AghapyTV.eg","x-AlQuranAlKareemTV.sa","x-AlSunnahAlNabawiyahTV.sa","x-AlWilayah.ir","x-AlJawadainTV.iq","x-AlSahatTV.ye","x-AlabbassiaTV.iq","x-AlkarmaTVAustralia.us","x-AlkarmaTVFamily.us","x-AlkarmaTVMiddleEast.us","x-AlkarmaTVNorthAmericaCanada.us","x-AlkarmaTVPraise.us","x-AlkarmaTVTalmazaDiscipleship.us","x-AlkarmaTVYouthEnglish.us","x-AlmagdTVMiddleEast.us","x-AlmagdTVNorthAmerica.us","x-Alquran.iq","x-ATVSat.us","x-BahrainQuran.bh","x-Ch4TeenDocumentary.kw","x-CharityTV.lb","x-HolyQuranRadio.sa","x-KTVAlQurain.kw","x-LogosTV.us","x-LoveWorldArabic.ng","x-MahdawiounTV.iq","x-MarjaeyatTVArabic.iq","x-NourAlKoddass.lb","x-NourAlSharq.lb","ch-mbc1","ch-mbc4","ch-mbc5","ch-mbc-masr","ch-mbc-masr2","ch-mbc-iraq","ch-iraqia","ch-ktv1","ch-ktv-ethraa","ch-qatar-tv","ch-alsaudiya","ch-ksa-now","ch-sbc","ch-thaqafiya","ch-sharjah","ch-sharjah2","ch-jordan-tv","ch-jordan-comedy","ch-jordan-kitchen","ch-mtv-lebanon","ch-future","ch-chada","ch-2m","ch-alaraby","ch-alaraby2","ch-syria","ch-palestine","ch-falastini","ch-watania1","ch-dabanga","ch-libya","ch-yemen-today","ch-kurdsat","ch-zagros","x-HyaTV.eg","ch-asharq-disc","ch-jordan-tourism","x-AlArabiyaPrograms.ae","x-KarbalaDocumentary.iq","x-AsharqDocumentary","ch-mbc-mood","ch-fairuz","ch-tarab","ch-rabeh-saqer","ch-aghani","x-JeddahRadio.sa","x-mfm.lb","x-MosaiqueFM.tn","x-PanoramaFM.sa","x-AsharqRadio.sa","x-QBC.qa","x-AlHiwarTV.uk","x-KTVArabe.kw","x-AjmanTV.ae","x-AlRayyanOldTV.qa","x-AlRayyanTV.qa","x-AlSharqiyaMinKabla.ae","x-AlWoustaTV.ae","x-Althania.sy","x-ElWatania2.tn","x-ElsharqTV.tr","x-MusawaChannel.ps","x-PalestineMubasher.ps","x-RajeenTV.ps","x-SharjahRadio.ae","x-UTV.iq","x-WatanTV.eg","x-WatarRadio.ae","ch-aje"];
var GRP_FR=["x-INCRadio.ph", "ch-cgtn-doc", "ch-documentary-plus", "ch-trace-urban", "x-IshtarTV.iq", "x-Live99FM.bq", "x-NVKSakha.ru", "ch-dw-en", "ch-f24-en", "ch-trt-world", "ch-cgtn", "ch-nhk", "ch-africanews", "ch-bloomberg", "x-News18AssamNorthEast.in", "x-AbanteTV.ph", "x-ABPNews.in", "x-Africa24English.fr", "x-AlArabiyaEnglish.sa", "x-ArirangUN.kr", "x-BilyonaryoNewsChannel.ph", "x-Canal1MarMenorTorrePacheco.es", "x-Canal26.ar", "x-CanalI.ve", "x-Carivision.do", "x-CheddarNews.us", "x-CNA.sg", "x-CNNNews18.in", "x-CNNOriginals.us", "x-EntertainmentTonight.us", "x-EstrellaNews.us", "x-Europe1TV.fr", "x-GBNews.uk", "x-HindiKhabar.in", "x-i24NEWSEnglishWorld.il", "x-i24NEWSFrench.il", "x-IndiaDailyLive.in", "x-IranInternational.uk", "x-JantaTV.in", "x-KBCNews.in", "x-Kurdistan24.iq", "x-LatinaNoticias247.pe", "x-M95TelevisionMarbella.es", "x-Medi1TVAfrique.ma", "x-MonacoInfo.mc", "x-Nanduti.py", "x-NCTV.cl", "x-NDTVMadhyaPradeshChhattisgarh.in", "x-NDTVRajasthan.in", "x-NewsNation.in", "x-NewsNation81.in", "x-NewsoftheWorld.us", "x-News18BiharJharkhand.in", "x-News18DelhiNCRJK.in", "x-News18India.in", "x-News18MadhyaPradeshChhattisgarh.in", "x-News18PunjabHaryanaHimachal.in", "x-News18Rajasthan.in", "x-News18Urdu.in", "x-News18UttarPradeshUttarakhand.in", "x-News9Live.in", "x-Newsmax2.us", "x-NewsmaxSpanish.us", "x-NewsWorld.hk", "x-Newsy.us", "x-Noticiero90Minutos.co", "x-NowMediaTelevision.us", "x-NPY.py", "x-NTDTVEnglish.us", "x-PayamTV.iq", "x-RedPlus.co", "x-RepublicTV.in", "x-ReutersTV.us", "x-RPPTV.pe", "x-RTenEspanol.ru", "x-RTFrance.fr", "x-RudawTV.iq", "x-SalemNewsChannel.us", "x-SkyNewsExtra3.au", "x-SterkTV.be", "x-AS3SportTV.ve", "x-beINSPORTSXTRAenEspanol.us", "x-CricketGold.au", "x-CRTV.cl", "x-DDSports.in", "x-DraftKingsNetwork.us", "x-Equidia.fr", "x-FastFunBox.nl", "x-FightNetwork.ca", "x-FITE247.us", "x-FoxSportsNews.au", "x-FTFSports.us", "x-FUELTV.pt", "x-GamePlus.ca", "x-HBCUGOSports.us", "x-Kabaddi24x7.in", "x-MMATVcom.ru", "x-MonterricoTV.pe", "x-MUTV.uk", "x-NauticalChannel.it", "x-RACERInternational.pl", "x-RallyTV.us", "x-RealMadridTV.es", "x-RealMadridTVEnglish.es", "x-RightNowTV.us", "x-SkyRacing1.au", "x-SportsGrid.us", "x-SqalaTV.pe", "x-Stadium.us", "x-Strongman.us", "x-StrongmanChampionsLeague.uk", "x-SwerveCombat.us", "x-SwerveSports.us", "x-TalentTV.lk", "x-TennisChannel.us", "x-TJKTV.tr", "x-TurfMovil.cl", "x-TyCSports.ar", "x-WorldPokerTour.us", "x-ABNBibleMoviesChannel.us", "x-AllTimeMovies.in", "x-ARTFLIXMovieClassics.us", "x-AuroraMediaFilms.gt", "x-B4UKadak.in", "x-B4UMovies.in", "x-CanalCineDios.co", "x-Charge.us", "x-CINDIETV.br", "x-CineSony.us", "x-CineWestern.fr", "x-Cinevault80s.us", "x-CinevaultWesterns.us", "x-ColorsCineplex.in", "x-EmotionL.fr", "x-FILMBOXPlusEmotion.pl", "x-FILMBOXPlusFestival.pl", "x-FILMBOXPlusHits.pl", "x-FILMBOXPlusLoveCrime.pl", "x-Goldmines.in", "x-GoldminesBollywood.in", "x-GoldminesMovies.in", "x-GREATmovies.uk", "x-GREATromance.uk", "x-GrjngoWesternMovies.de", "x-IndywoodTV.in", "x-MadeInHollywood.us", "x-MahaMovie.in", "x-ManoranjanGrand.in", "x-MaverickBlackCinema.us", "x-MCITelevision.co", "x-MegaCineTV.do", "x-Movies.us", "x-MovieSphere.us", "x-MovieSphereGold.us", "x-NOST.us", "x-RetroCrush.us", "x-ScreamIN.fr", "x-ShubhCinemaTV.in", "x-SonyMovies.us", "x-SonyOneFavoris.fr", "x-SonyOneHitsAction.fr", "x-SonyOneHitsComedie.fr", "x-TVSRetro.gt", "x-WarnerTVAsia.us", "x-XtremaAccion.ar", "x-XtremaCineClasico.ar", "x-ZeeCinema.in", "x-48Hours.us", "x-AllWeddingsWEtv.us", "x-AngerManagementChannel.us", "x-AntiquesRoadshowUK.us", "x-AreWeThereYet.us", "x-DarkMatterTV.us", "x-DealorNoDeal.us", "x-DoctorWhoClassic.us", "x-DogtheBountyHunter.us", "x-FearFactor.us", "x-FrequenceNovelas.fr", "x-HauntTV.ca", "x-HomesUnderHammer.us", "x-ImpossibleQuizShow.us", "x-InsideCrime.us", "x-JudgeNosey.us", "x-MidsomerMurders.us", "x-Nosey.us", "x-PBSAntiquesRoadshow.us", "x-SerieMax.ci", "x-SonyOneBlacklist.fr", "x-Survivor.us", "x-TheWalkingDeadUniverse.us", "x-ThisOldHouse.us", "x-XPTVUS.es", "x-1KZNTV.za", "x-AfarinTV.iq", "x-AkiliKids.ke", "x-AMGTV.us", "x-BabySharkTV.us", "x-BotflixTV.us", "x-CartoonNetworkAsia.sg", "x-ChinolaTV.do", "x-DoveChannel.us", "x-ducktv.sk", "x-eSportsMaxTV.ve", "x-EstrellaGames.us", "x-ExtremaKidsTV.cr", "x-HappyKids.us", "x-HopeChannelPROYECTOJA.cr", "x-IuniorTV.it", "x-JapanimTV.be", "x-KartoonChannel.us", "x-KnowledgeNetwork.ca", "x-LegoChannel.us", "x-LogosTVKids.es", "x-MAXAnime.ve", "x-Mixkurdy.iq", "x-MrBeanAnimated.uk", "x-Nickelodeon.de", "x-NinjaKidzTV.us", "x-PBSKids.us", "x-PBSKidsAlaska.us", "x-PBSKidsHawaii.us", "x-PBSKidsMountain.us", "x-PBSKidsPacific.us", "x-PequesTV.pe", "x-PositivTV.us", "x-RyanandFriends.us", "x-SowetoTV.za", "x-SpacetoonTurkey.tr", "x-SuperSimpleSongs.us", "x-ThePetCollective.us", "x-TigueritoTV.do", "x-TinyPop.uk", "x-ToonGoggles.us", "x-TRTDiyanetCocuk.tr", "x-TshwaneTV.za", "x-TVFamilia.ve", "x-TVFamille.mq", "x-TVOKids.ca", "x-UniqueTV.in", "x-WOWKidz.in", "x-XtremaCartoons.ar", "x-YuGiOh.us", "x-ZooMoo.sg", "x-AdventureEarth.de", "x-AutenticHistory.de", "x-BBCEarth.uk", "x-BTBInfo.pl", "x-CosmosTV.py", "x-CourtTV.us", "x-DocuBox.nl", "x-Ecovision.do", "x-HistoryAsia.us", "x-HistoryHit.uk", "x-INWILD.nl", "x-InWonder.nl", "x-LawCrime.us", "x-LovePets.ca", "x-LoveThePlanet.es", "x-MediBizTV.in", "x-NatureTime.ca", "x-RTDocumentary.ru", "x-TheNest.us", "x-WaterBear.ch", "x-WedoBigStories.ch", "x-WildEarth.za", "x-Wonder.uk", "x-10Bold.au", "x-360TuneBox.nl", "x-9XJalwa.in", "x-9XM.in", "x-BalleBalle.in", "x-BestofDanceTV.ee", "x-DanceTVDeepHouseDistrict.ee", "x-DanceTVHouseFloor.ee", "x-DeluxeRap.de", "x-E40.py", "x-ElSolNetworkTV.ec", "x-FUSIONTV.mq", "x-HEiNow.py", "x-HypeVisualRadio.nl", "x-InfinitaTV.ec", "x-MadrasFMTV.gp", "x-MBCAmerica.us", "x-MBCFM.ae", "x-MovieMusicbyStingray.ca", "x-MusicTVGranada.es", "x-Now80s.uk", "x-Now90s00s.uk", "x-Planet1009FM.pa", "x-QelloConcertsbyStingray.ca", "x-QwestTV.fr", "x-QwestTVJazzBeyond.fr", "x-RTVVida.es", "x-ScorchTV.tt", "x-StingrayCityscapes.ca", "x-StingrayClassicRock.ca", "x-StingrayClassica.ca", "x-StingrayCozyCafe.ca", "x-StingrayDJAZZ.ca", "x-StingrayEasyListening.ca", "x-StingrayEverything80s.ca", "x-StingrayFlashback70s.ca", "x-StingrayHitList.ca", "x-StingrayHolidayHits.ca", "x-StingrayHolidayscapes.ca", "x-StingrayHotCountry.ca", "x-StingrayJukeboxOldies.ca", "x-StingrayKaraoke.ca", "x-StingrayNaturescape.ca", "x-StingrayNothinBut90s.ca", "x-StingrayPopAdult.ca", "x-StingrayRockAlternative.ca", "x-AhlulbaytTV.uk", "x-AlMahdiTV.us", "x-AmazingFactsTV.us", "x-AnandTV.in", "x-ArkTV.ug", "x-CanalOracionConSon.co", "x-CatholicTV.us", "x-CBNEspanol.us", "x-CBNFamily.us", "x-CBNNews.us", "x-ChannelDivya.in", "x-CieloTV.do", "x-CSatTV.us", "x-EbenezerTV.hn", "x-EBNTelevision.pr", "x-ElevationChurchNetwork.us", "x-FaithAfrica.za", "x-FatehTV.in", "x-FrecuenciaFTV.co", "x-GNNTV.jm", "x-GospelTruthTV.us", "x-ItIsWrittenTV.us", "x-ItsSupernaturalNetwork.us", "x-JBNTV.hn", "x-JEMRTV.hn", "x-LalegulTV.tr", "x-LogosTVEnglish.us", "x-ManaChurchOnline.pt", "x-ManaEgliseOnline.pt", "x-ManaIglesiaOnline.pt", "x-MariaVisionUSA.us", "x-MarjaeyatTVEnglish.iq", "x-MercyTV.in", "x-AceTV.us", "x-AlegreTVRD.do", "x-Antena21.do", "x-AutenticTravel.de", "x-BizTV.us", "x-BounceXL.us", "x-BuenaTV.pr", "x-CanalNets.co", "x-Carac1.ch", "x-Carac4.ch", "x-ColorsMENA.in", "x-Comet.us", "x-Dangal2.in", "x-DMAX.it", "x-EDNTV.hn", "x-ENTChannel.uk", "x-ENTFamily.uk", "x-EpicBharat.in", "x-ESTV.us", "x-EstrellaTV.us", "x-EVITV.cd", "x-FashionFinds.us", "x-FashionTVParisLOriginal.fr", "x-GameShowNetwork.us", "x-GangaurTV.in", "x-Giallo.it", "x-GritXtra.us", "x-Heartland.us", "x-HGTV.it", "x-HiDost.in", "x-HiYAH.us", "x-HobbyMaker.uk", "x-HSN.us", "x-HSN2.us", "x-HumTV.pk", "x-IERTBCSCanal82.mx", "x-ImpactNetwork.us", "x-INFAST.nl", "x-INSP.us", "x-IONPlus.us", "x-JusticeCentralTV.us", "x-KContentbyCJENM.us", "x-Kanal7Avrupa.tr", "x-KanalDDrama.tr", "x-KC2.rw", "x-KIX.hk", "x-KNino.us", "x-LaNuestra.cl", "x-LaNuevaRadioTV977.ec", "x-MBCPersia.ae", "x-MysteryTV.us", "x-PlousTV.ve", "x-PopuTV.py", "x-QVC3.us", "x-RCNMas.co", "x-RCNNovelas.co", "x-Roar.us", "x-ShopLC.us", "x-TalTV.ne", "x-TJC.uk", "x-WipeoutXtra.us", "x-XploreTV.us", "x-YachtingTV.cz", "x-ZeeOne.uk", "x-BFMBusiness.fr", "x-BloombergHT.tr", "x-CanalPro.py", "x-ChampionTV.ci", "x-CNBCAwaaz.in", "x-CNBCMongolia.mn", "x-CNBCTV18.in", "x-CNBCTV18PrimeHD.in", "x-EntrepreneurTV.us", "x-FoxBusinessNetwork.us", "x-NDTVProfit.in", "x-NegociosTV.es", "x-NWEconomie.tg", "x-SchwabNetwork.us", "x-YahooFinance.us", "x-ZeeBusiness.in", "x-ZuracaTV.bo", "x-AsiriTV.pe", "x-ATXN3.us", "x-BUTV10.us", "x-CiracuTV.ec", "x-ClassicArtsShowcase.us", "x-DDBharati.in", "x-DDKisan.in", "x-DerryTV23.us", "x-DKN.us", "x-DLTV1.th", "x-DLTV10.th", "x-DLTV11.th", "x-DLTV12.th", "x-DLTV13.th", "x-DLTV14.th", "x-DLTV15.th", "x-DLTV2.th", "x-DLTV3.th", "x-DLTV4.th", "x-DLTV5.th", "x-DLTV6.th", "x-DLTV7.th", "x-DLTV8.th", "x-DLTV9.th", "x-EducaTV.ec", "x-EETTV.ca", "x-Gyandarshan.in", "x-HolvoetTV.cl", "x-HyderTV.ca", "x-ILCECanal15SummaSaberes.mx", "x-JaliscoTV.mx", "x-KajouTV.us", "x-KTV2.kw", "x-LeominsterTVEducational.us", "x-LuysTV.tr", "x-MidpenMediaCenterChannel28.us", "x-MidpenMediaCenterChannel30.us", "x-MidpenMediaCenterChannel75.us", "x-NashuaETV.us", "x-NatickEducationChannel.us", "x-PayamJavanTV.us", "x-PBS.us", "x-PresumiendoMexico.mx", "x-QausainTV.ng", "x-TUTV.us", "x-UAATV.mx", "x-UnisonTV.mx", "x-UTalcaTV.cl", "x-zenith.fr", "x-ArubaTV.aw", "x-AsianFoodNetwork.sg", "x-BeachTVFloridaAlabama.us", "x-BeachTVKeyWestFloridaKeys.us", "x-BeachTVMyrtleBeachTheGrandStrand.us", "x-BeachTVPanamaCity.us", "x-bonappetit.us", "x-DiscoverPakistan.pk", "x-FunRoads.us", "x-GustoTV.ca", "x-IntheKitchen.us", "x-MyDestinationTV.us", "x-OEPMTV.do", "x-RecipeTV.us", "x-Tastemade.us", "x-AgroTV.pe", "x-AgrotendenciaTV.cr", "x-AKCTV.us", "x-CanalMotor.no", "x-CarsTV.us", "x-DuckHuntingTV.us", "x-ElMundodelCampo.co", "x-GarageTVLatinAmerica.ar", "x-HorseCountryTV.uk", "x-OutdoorChannel.us", "x-SwamijiTVAmerican.at", "x-SwamijiTVAustralian.at", "x-SwamijiTVEuropean.at", "x-UMCTV.co", "x-WaypointTV.us", "x-ComedyDynamics.us", "x-ComedyTV.us", "x-DryBarComedyPlus.us", "x-FailArmy.us", "x-JustforLaughsGags.us", "x-RiffTrax.us", "x-8NTV.mx", "x-AccuWeatherNOW.us", "x-AFTV.us", "x-AlanyaPostaTV.tr", "x-Antena7.do", "x-AntofagastaTV.cl", "x-ArabiTV.es", "x-ATXN1.us", "x-ATXN2.us", "x-AustralTV.ec", "x-AZATVHD.hn", "x-B15Fresnillo.mx", "x-B15Zacatecas.mx", "x-BerksCommunityTV.us", "x-BritAsiaTV.uk", "x-Canal11.hn", "x-Canal2Misiones.ar", "x-Canal2Quellon.cl", "x-Canal3LaPampa.ar", "x-Canal4RD.do", "x-Canal7Neuquen.ar", "x-Canal9BioBioTelevision.cl", "x-CanalCdelZulia.ve", "x-CanalOnce.mx", "x-CanalSanRoque.es", "x-CannesLerinsTV.fr", "x-CHTV.hn", "x-CinevisionCanal19.do", "x-CiraTV.de", "x-CMMTV.es", "x-CostaNoroesteTV.es", "x-CotubanamaTV.do", "x-CreaLaTV.mx", "x-DiezTVLasVillas.es", "x-DiezTVUbeda.es", "x-EbS.be", "x-Ecuavisa.ec", "x-ETV.gp", "x-Homeful.ca", "x-IslitaTV.cl", "x-KalacTV.gn", "x-KordiaTV.nz", "x-Latina.pe", "x-LeFigaroTVIledeFrance.fr", "x-LegislativeAssemblyofElSalvador.sv", "x-Matele.be", "x-MaxTV.ch", "x-MMTV.mv", "x-MNBWorld.mn", "x-MonumentalTV.py", "x-NBTWorld.th", "x-NouvelleCaledonie1ere.nc", "x-Nove.it", "x-ParliamentTV.nz", "x-PichilemuTV.cl", "x-Pop.uk", "x-PuruwaTV.ec", "x-RealWild.uk", "x-RefletTV.ci", "x-Sat7Turk.cy", "x-ShubhTV.in", "x-SilkWay.kz", "x-SparkTV.uk", "x-StudioPlusTV.ec", "x-TeleSahel.ne", "x-Telearuba.aw", "x-Telefuturo.py", "x-TeleOnce.pr", "x-Telepacifico.co", "x-TelevisionCaribbean.kn", "x-TelevisionMetropolis191.hn", "x-TelevisionMetropolis192.hn", "x-TRT1.tr", "x-TRT2.tr"];
var GRP_MX=["ch-rbtv","ch-movies-action","ch-movies-thriller","ch-babyfirst","x-Pulse95Radio.ae","x-RojavaTV.sy","x-RonahiTV.sy","x-MBCBollywood.ae"];
var GROUPS=['عربية','أجنبية','غير محدد'];
function grpOf(c){return GRP_AR.indexOf(c.id)>-1?'عربية':GRP_FR.indexOf(c.id)>-1?'أجنبية':'غير محدد'}
var channels=(DATA.items||[]).filter(function(i){return i.kind==='channel'&&!i.soon});
channels.forEach(function(c){c._g=grpOf(c)});

/* ─────────── المشغل ─────────── */
var player=S.createPlayer({
  titleBase:DATA.page.title,
  onPlay:function(it){
    renderChLists();
  },
  onEnded:function(it){/* البث المباشر لا ينتهي — لا فعل */},
  onFavsChange:function(){renderChLists()},
  onPickOther:function(){renderChLists()}
});

/* ─────────── القوائم والتصنيفات ─────────── */
function matches(c){
  var q=(state.query||'').trim().toLowerCase();
  var okCat=(state.chFilter==='الكل'||c.cat===state.chFilter)&&c._g===state.grp;
  if(!q)return okCat;
  var hay=(c.name+' '+(c.cat||'')+' '+(c.country||'')+' '+(c.desc||'')).toLowerCase();
  return okCat&&hay.indexOf(q)>-1;
}
function filtered(){return channels.filter(matches)}

function renderChLists(){
  var inGrp=channels.filter(function(c){return c._g===state.grp});
  var cats=['الكل'];
  inGrp.forEach(function(c){if(cats.indexOf(c.cat)<0)cats.push(c.cat)});
  if(cats.indexOf(state.chFilter)<0)state.chFilter='الكل';
  /* شريط المجموعة + أزرار التصنيفات — تُشتق آليًا من البيانات */
  ['stvChFiltersM','stvChFiltersD'].forEach(function(fid){
    var box=d.getElementById(fid);if(!box)return;
    var wrap=box.parentNode.classList.contains('stv-fwrap')?box.parentNode:null;
    if(!wrap){
      wrap=d.createElement('div');wrap.className='stv-fwrap';
      box.parentNode.insertBefore(wrap,box);wrap.appendChild(box);
      var g0=d.createElement('div');g0.className='stv-grpbar';wrap.insertBefore(g0,box);
    }
    var gb=wrap.querySelector('.stv-grpbar');gb.innerHTML='';
    GROUPS.forEach(function(g){
      var n=channels.filter(function(c){return c._g===g}).length;
      if(!n)return;
      var b=d.createElement('button');b.className='stv-chip-f stv-grp'+(state.grp===g?' on':'');
      b.textContent=g+' · '+n;
      b.setAttribute('aria-pressed',state.grp===g);
      b.addEventListener('click',function(){if(state.grp!==g){state.grp=g;state.chFilter='الكل';renderChLists()}});
      gb.appendChild(b);
    });
    box.innerHTML='';
    cats.forEach(function(cat){
      var b=d.createElement('button');b.className='stv-chip-f'+(state.chFilter===cat?' on':'');b.textContent=cat;
      b.setAttribute('aria-pressed',state.chFilter===cat);
      b.addEventListener('click',function(){state.chFilter=cat;renderChLists()});
      box.appendChild(b);
    });
  });
  var list=filtered();
  /* السابق/التالي يتبعان المجموعة والتصنيف والبحث الظاهرة؛ القناة الجارية تبقى في أول القائمة إن كانت خارجها */
  var cur=player.current(),pl=list;
  if(cur&&list.every(function(c){return c.id!==cur.id}))pl=[cur].concat(list);
  player.setPlaylist(pl);
  /* عدّاد القنوات في ترويسة اللوح الجانبي */
  var cnt=d.getElementById('stvChCount');
  if(cnt)cnt.textContent=list.length+(list.length===channels.length?' قناة':' / '+channels.length);
  ['stvChListM','stvChListD'].forEach(function(lid){
    var el=d.getElementById(lid);if(!el)return;el.innerHTML='';
    list.forEach(function(c){
      var on=player.current()&&player.current().id===c.id;
      var b=d.createElement('button');b.className='stv-ch'+(on?' on':'');
      b.setAttribute('aria-label','تشغيل قناة '+c.name);
      var av='<span class="stv-ch-av" style="background:'+S.gradCss(c.cat)+'">'+esc(c.name.trim().charAt(0))+'</span>';
      /* v2.4.0: شعار القناة فوق الحرف — عند فشل تحميل الشعار يُزال فيظهر الحرف تلقائيًا */
      if(c.logo){av='<img class="stv-ch-logo" loading="lazy" alt="" src="'+esc(c.logo)+'" onerror="this.remove()">'+av}
      b.innerHTML='<span class="stv-ch-avwrap">'+av+'</span>'
        +'<span class="stv-ch-meta"><b>'+esc(c.name)+'</b><small><i class="dotl"></i>'+esc(c.cat)+' · '+esc(c.country||'')+(c.lang?' · '+esc(c.lang):'')+(c.hd?' <span class="stv-badge-hd">HD</span>':'')+'</small></span>'
        +icon(on?'pause':'play');
      b.addEventListener('click',function(){
        player.play(c);
        if(w.innerWidth<1024){S.toast('جارٍ تشغيل: '+c.name)}
      });
      el.appendChild(b);
    });
    if(!el.children.length){
      el.innerHTML='<div class="stv-empty">'+icon(state.query?'search':'tv')
        +'<div>'+(state.query?'لا نتائج في «'+state.grp+' · '+state.chFilter+'» — جرّب «الكل» أو مجموعة أخرى':'لا توجد قنوات في هذا التصنيف بعد — أضف قنوات من ملف البيانات')+'</div></div>';
    }
  });
}

/* فتح/إغلاق قائمة القنوات على الهاتف */
function bindPanelBtn(){
  var btn=$('#stvPanelBtn');if(!btn)return;
  btn.addEventListener('click',function(){
    var p=$('#stvChPanel');if(!p)return;var on=p.classList.toggle('open');
    this.setAttribute('aria-expanded',on);
    if(on)setTimeout(function(){p.scrollIntoView({behavior:'smooth',block:'nearest'})},180);
  });
}

/* ─────────── البحث ─────────── */
var searchT=null;
function bindSearch(){
  var inp=$('#stvSearch');if(!inp)return;
  inp.addEventListener('input',function(){
    var v=this.value;clearTimeout(searchT);
    searchT=setTimeout(function(){state.query=v;renderChLists()},180);
  });
  var clr=$('#stvSearchClear');
  if(clr)clr.addEventListener('click',function(){
    inp.value='';state.query='';renderChLists();inp.focus();
  });
  var btn=$('#stvSearchBtn');
  if(btn)btn.addEventListener('click',function(){
    var wrap=$('#stvSearchWrap');var on=wrap.classList.toggle('open');
    this.setAttribute('aria-expanded',on);
    if(on)setTimeout(function(){inp.focus()},120);
  });
}

/* ─────────── البدء ─────────── */
function bootDefault(){
  if(player.current())return;
  var featured=null;
  channels.forEach(function(c){if(c.featured)featured=c});
  if(featured){player.play(featured,{muted:true});return}
  player.showIdle(true);
}
/* نصوص الهوية والروابط من ملف البيانات */
function applyPageMeta(){
  var h=$('#stvIdleTitle');if(h)h.innerHTML=DATA.page.idleTitle;
  var p=$('#stvIdleText');if(p)p.textContent=DATA.page.idleText;
  var iw=$('#stvIntroWord');if(iw&&DATA.page.introWord)iw.innerHTML=DATA.page.introWord;
  var is=$('#stvIntroSub');if(is&&DATA.page.introSub)is.textContent=DATA.page.introSub;
  var fc=$('#stvFooterCompanion');
  if(fc){ if(DATA.links&&DATA.links.companion){fc.href=DATA.links.companion;fc.style.display=''}else{fc.style.display='none'} }
  var fr=$('#stvFooterReport');
  if(fr){ if(DATA.links&&DATA.links.report){fr.href=DATA.links.report;fr.style.display=''}else{fr.style.display='none'} }
}

function init(){
  S.applyTheme();S.bindThemeBtn();
  S.renderTicker(DATA.news);
  applyPageMeta();
  bindSearch();bindPanelBtn();renderChLists();
  var start=$('#stvStartBtn');
  if(start)start.addEventListener('click',function(){
    var first=channels.filter(function(c){return c.featured})[0]||channels[0];
    if(first){player.play(first,{muted:false});player.muted(false)}
  });
  S.maybeIntro(DATA.page.introKey,bootDefault);
}
if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',init);else init();
})();
