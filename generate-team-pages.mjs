import { writeFileSync } from "node:fs";
import { join } from "node:path";

const teams = [
  {
    slug: "arsenal",
    name: "Arsenal",
    heroTitle: "How Arsenal can make their right-side rotations feel dangerous again.",
    heroDek: "This page treats each club as its own tactical desk within the same publication. The visual language stays consistent with the homepage, while the analysis shifts fully into Arsenal's questions around spacing, control and final-third variety.",
    author: "James McNicholas",
    updated: "Updated 2 hours ago",
    note: "Positional lens",
    stats: [
      { label: "Base shape", number: "3-2-5", copy: "The platform is still there, but the final line needs more varied timing from the right eight and winger." },
      { label: "Press trigger", number: "Back-pass", copy: "Arsenal are at their sharpest when the front line jumps together and the midfield line follows without hesitation." },
      { label: "Key zone", number: "Right half-space", copy: "That channel decides whether attacks become sterile possession or proper chances." },
      { label: "Main tension", number: "Risk v control", copy: "The puzzle is adding incision without sacrificing the team's rest-defence security." }
    ],
    articles: [
      { tag: "Build-up play", title: "Why Odegaard's starting position matters as much as his final pass.", dek: "The first few metres of his movement determine whether Arsenal access the half-space cleanly or force another reset outside the block.", author: "Liam Tharme", meta: "8 min read · Today" },
      { tag: "Attacking shape", title: "The overlapping full-back is back, but only when the winger pins exactly on cue.", dek: "This piece tracks the timing that creates proper width rather than decorative width, and why the distinction changes everything.", author: "Mark Carey", meta: "9 min read · Yesterday" },
      { tag: "Pressing", title: "Arsenal's counter-press still works. The issue is what happens after the first regain.", dek: "Recovering possession is only half the sequence. The best teams already know their next two passes before the duel is won.", author: "Michael Cox", meta: "10 min read · 2 days ago" }
    ],
    notebook: "Arsenal's page leans into control, rotations and the small tactical mechanisms that separate territorial dominance from real incision."
  },
  {
    slug: "aston-villa",
    name: "Aston Villa",
    heroTitle: "How Aston Villa can keep their vertical threat without opening the floor underneath them.",
    heroDek: "Villa's page is built around Emery's details: narrow distances, clean exits and the balance between brave line-breaking passes and defensive shape behind the ball.",
    author: "Jacob Tanswell",
    updated: "Updated 4 hours ago",
    note: "Emery lens",
    stats: [
      { label: "Base shape", number: "4-4-2 box", copy: "Villa's compactness is less about labels and more about where the two tens appear when possession settles." },
      { label: "Press trigger", number: "Wide touch", copy: "The cue to squeeze is often the opponent's first heavy touch near the sideline." },
      { label: "Key zone", number: "Inside-left", copy: "That lane is where Villa can combine quickly before springing forward into space." },
      { label: "Main tension", number: "Height of line", copy: "The reward is territory. The risk is one clean escape turning into a foot race." }
    ],
    articles: [
      { tag: "Structure", title: "Why Villa's narrow midfield is a feature, not a flaw, against most blocks.", dek: "Their best attacks come from crowding central zones first, then releasing runners when the opposition has already collapsed inward.", author: "Ahmed Walid", meta: "8 min read · Today" },
      { tag: "Pressing", title: "The offside trap is still powerful, but only if the front press buys the back line time.", dek: "The entire mechanism depends on pressure on the ball arriving before the defender has a clean head-up picture.", author: "Michael Cox", meta: "11 min read · Yesterday" },
      { tag: "Profiles", title: "Morgan Rogers and the art of carrying through contact into the final pass.", dek: "This is a profile of how ball-carrying changes the geometry of a match before the defence can reset itself.", author: "Gregg Evans", meta: "7 min read · 2 days ago" }
    ],
    notebook: "Aston Villa's page is about compact aggression: compress space, invite a mistake, then attack the moment before the block reforms."
  },
  {
    slug: "bournemouth",
    name: "Bournemouth",
    heroTitle: "How Bournemouth's press keeps creating chaos that still feels organised.",
    heroDek: "Bournemouth's identity is built on collective aggression. The page focuses on how their press, second-ball work and direct transitions create a style that is frantic on the surface but drilled underneath.",
    author: "Philip Billing",
    updated: "Updated 3 hours ago",
    note: "Intensity lens",
    stats: [
      { label: "Base shape", number: "4-2-3-1", copy: "The nominal shape matters less than how quickly the wingers jump inside to lock the centre." },
      { label: "Press trigger", number: "Square pass", copy: "Once the ball travels laterally, Bournemouth attack the receiver before he can turn out." },
      { label: "Key zone", number: "Second balls", copy: "Loose recoveries are where they turn messy games into territorial wins." },
      { label: "Main tension", number: "Control after regain", copy: "The next action has to be calm enough to exploit the chaos they just created." }
    ],
    articles: [
      { tag: "Pressing", title: "Why Bournemouth's first step forward is often their most important tactical action.", dek: "The real advantage comes from shrinking the receiver's time before the duel even begins.", author: "Mark Carey", meta: "8 min read · Today" },
      { tag: "Transitions", title: "Direct does not mean random: the passing map behind Bournemouth's quick attacks.", dek: "There is a pattern to where the first ball goes, where the support run arrives, and how the attack stays layered.", author: "Liam Tharme", meta: "9 min read · Yesterday" },
      { tag: "Midfield", title: "How Bournemouth stop games becoming too stretched for their own good.", dek: "The holding midfielders do more than screen; they quietly decide whether the side can attack again after the first wave.", author: "Tifo Analysts", meta: "10 min read · 2 days ago" }
    ],
    notebook: "Bournemouth's page follows the details that make a high-energy style sustainable over ninety minutes rather than just ten wild spells."
  },
  {
    slug: "brentford",
    name: "Brentford",
    heroTitle: "How Brentford can keep their direct edge while adding more settled-possession threat.",
    heroDek: "Brentford's page tracks one of the league's smartest pragmatists. The emphasis is on restarts, territory, front-two relationships and the moments when direct football becomes a controlled plan rather than a last resort.",
    author: "Jay Harris",
    updated: "Updated 5 hours ago",
    note: "Game-state lens",
    stats: [
      { label: "Base shape", number: "3-5-2", copy: "The wing-backs define the width while the front pair constantly test depth and second-ball angles." },
      { label: "Press trigger", number: "Back to goal", copy: "Brentford jump hardest when they know the receiver's next touch can only be secure, not progressive." },
      { label: "Key zone", number: "Crossing lanes", copy: "Their best deliveries come when the final pass arrives early, before the defence can set." },
      { label: "Main tension", number: "Territory v possession", copy: "There is value in going long, but also in knowing when a spell of short passes buys rest." }
    ],
    articles: [
      { tag: "Front two", title: "Brentford's strike partnerships work because the runners do different jobs.", dek: "One pins, one drifts, and both give the midfield a stable target map once the first ball goes long.", author: "Liam Tharme", meta: "8 min read · Today" },
      { tag: "Set pieces", title: "Why Brentford still treat dead balls as a primary attacking phase, not a bonus.", dek: "The routines are part of the identity and remain one of the clearest ways to tilt a match their way.", author: "Mark Carey", meta: "7 min read · Yesterday" },
      { tag: "Possession", title: "The quiet tweaks that could make Brentford harder to pin back between long spells.", dek: "This is less about becoming a possession side and more about adding a release valve when pressure builds.", author: "Michael Cox", meta: "10 min read · 3 days ago" }
    ],
    notebook: "Brentford's page leans into tactical efficiency: territory, restarts, duels and the small edges that add up over a season."
  },
  {
    slug: "brighton",
    name: "Brighton",
    heroTitle: "How Brighton can rebuild clean first-phase control without losing their nerve.",
    heroDek: "Brighton's page is about structure under pressure. It looks at the angles, distances and brave receiving positions that turn a crowded first phase into a route toward control higher up the pitch.",
    author: "Andy Naylor",
    updated: "Updated 2 hours ago",
    note: "Build-up lens",
    stats: [
      { label: "Base shape", number: "2-4 build", copy: "Brighton want enough bodies near the ball to tempt pressure, then enough spacing to escape it." },
      { label: "Press trigger", number: "Blind-side jump", copy: "Their most effective presses come from stealing the receiver's turning option before he sees it disappear." },
      { label: "Key zone", number: "First phase", copy: "The story of the match often starts with how cleanly Brighton get through their own defensive third." },
      { label: "Main tension", number: "Bravery v security", copy: "The same pass that unlocks a game can also hand the opponent a transition if the spacing is off." }
    ],
    articles: [
      { tag: "First phase", title: "The body shape details that make Brighton's centre-backs such important playmakers.", dek: "Receiving open, disguising the next pass and attracting pressure on purpose remain core parts of the model.", author: "Mark Carey", meta: "9 min read · Today" },
      { tag: "Midfield", title: "Why Brighton's six needs two passing ladders, not one, to survive an aggressive press.", dek: "The issue is not just access but what happens after the first receiver is found under pressure.", author: "Ahmed Walid", meta: "8 min read · Yesterday" },
      { tag: "Transitions", title: "Brighton can still play brave football if the rest-defence is drawn a yard narrower.", dek: "This piece looks at how recovery positions behind the ball can support the identity rather than dilute it.", author: "Michael Cox", meta: "10 min read · 2 days ago" }
    ],
    notebook: "Brighton's page is for readers who want to understand how intelligent risk looks when the structure around it is precise enough."
  },
  {
    slug: "chelsea",
    name: "Chelsea",
    heroTitle: "How Chelsea can turn all that possession into attacks that feel inevitable.",
    heroDek: "Chelsea's page focuses on a familiar modern problem: there is control, there are numbers, but the key question is how that territorial dominance becomes repeatable, high-quality final-third access.",
    author: "Liam Twomey",
    updated: "Updated 1 hour ago",
    note: "Control lens",
    stats: [
      { label: "Base shape", number: "3-2-5", copy: "The skeleton is modern and stable. The challenge is making the five ahead of the ball truly connected." },
      { label: "Press trigger", number: "Central lock", copy: "Chelsea look best when they can close the middle first and force play around them rather than through them." },
      { label: "Key zone", number: "Final pass lane", copy: "Occupying the box is one thing; accessing it with the right delivery is another." },
      { label: "Main tension", number: "Width v overloads", copy: "Holding the touchline helps spacing, but collapsing infield helps combinations. Timing decides the trade-off." }
    ],
    articles: [
      { tag: "Attacking shape", title: "Why Chelsea's five-lane occupation needs one more player thinking about the far post.", dek: "You can dominate the ball and still feel toothless if the final line does not attack the box with conviction.", author: "Mark Carey", meta: "8 min read · Today" },
      { tag: "Profiles", title: "Cole Palmer changes the speed of a move long before the final pass arrives.", dek: "The threat lies in pause, disguise and the way his receiving angles bend the rest of the defence around him.", author: "Michael Cox", meta: "9 min read · Yesterday" },
      { tag: "Pressing", title: "Chelsea's best pressing sequences come when the full-backs know exactly when not to jump.", dek: "Restraint can be as tactical as aggression, especially when protecting the lane behind the press.", author: "Liam Tharme", meta: "10 min read · 2 days ago" }
    ],
    notebook: "Chelsea's page tracks the details that convert patient, modern possession into genuinely punishing football."
  },
  {
    slug: "crystal-palace",
    name: "Crystal Palace",
    heroTitle: "How Crystal Palace can preserve their transition threat while building longer spells of control.",
    heroDek: "Palace's page looks at what happens when a team famous for direct release moments starts stitching more of the match together with the ball. The key is structure that serves the stars rather than restrains them.",
    author: "Matt Woosnam",
    updated: "Updated 3 hours ago",
    note: "Transition lens",
    stats: [
      { label: "Base shape", number: "3-4-2-1", copy: "The structure supports both wing-back width and central freedom for the creators behind the striker." },
      { label: "Press trigger", number: "Wide funnel", copy: "Palace want the game guided outside before they spring the pressure and attack the loose ball." },
      { label: "Key zone", number: "Inside channels", copy: "The narrow creators are where Palace can connect transition speed to proper combination play." },
      { label: "Main tension", number: "Freedom v shape", copy: "The best attackers need liberty, but the rest-defence still has to survive the moments after the move breaks down." }
    ],
    articles: [
      { tag: "Transitions", title: "Why Palace's best counter-attacks now start with one calmer pass than they used to.", dek: "There is growing value in pausing for half a second to improve the angle before the sprint begins.", author: "Ahmed Walid", meta: "7 min read · Today" },
      { tag: "Structure", title: "The wing-back depth that lets Palace stretch the pitch without disconnecting the front line.", dek: "Good spacing is not decorative here; it is the difference between one-v-ones and crowded dead ends.", author: "Mark Carey", meta: "9 min read · Yesterday" },
      { tag: "Profiles", title: "How Palace can keep creative stars central and still protect the flanks behind them.", dek: "The answer lies in who covers the vacated lane and when the outside centre-back chooses to step out.", author: "Liam Tharme", meta: "8 min read · 2 days ago" }
    ],
    notebook: "Crystal Palace's page follows the tactical details that make a dangerous transition side feel a little more complete with the ball."
  },
  {
    slug: "everton",
    name: "Everton",
    heroTitle: "How Everton's compactness keeps making matches smaller than their opponents want.",
    heroDek: "Everton's page is about territory, duels and defensive clarity. It follows how compact distances and reliable structure can turn games into contests played on Everton's terms rather than the opposition's ideals.",
    author: "Patrick Boyland",
    updated: "Updated 6 hours ago",
    note: "Compactness lens",
    stats: [
      { label: "Base shape", number: "4-5-1", copy: "The shape bends and shifts, but the core principle is narrow spacing and disciplined line movement." },
      { label: "Press trigger", number: "Touchline trap", copy: "Everton attack with purpose once the pass sends play toward the sideline and limits the next option." },
      { label: "Key zone", number: "Second phase", copy: "After clearances and knockdowns, winning the next duel is often where the territory battle is decided." },
      { label: "Main tension", number: "Exit quality", copy: "The side defend well enough to stay alive; the question is how to attack more cleanly after the regain." }
    ],
    articles: [
      { tag: "Defending", title: "Everton's back line keeps the game narrow before the winger even arrives to help.", dek: "The entire defensive picture begins with where the full-backs choose to stand before the pass is played.", author: "Michael Cox", meta: "8 min read · Today" },
      { tag: "Build-up play", title: "The one extra midfield angle Everton need when they want to play through pressure.", dek: "There are moments when the direct option is right, but also moments when a calmer access pass would lift the whole sequence.", author: "Mark Carey", meta: "9 min read · Yesterday" },
      { tag: "Transitions", title: "How Everton can turn clearances into counters instead of just a brief pause in defending.", dek: "The runners are there; the next step is making sure the first pass after the regain arrives with real intent.", author: "Liam Tharme", meta: "10 min read · 3 days ago" }
    ],
    notebook: "Everton's page keeps its eye on the quiet tactical work that makes a tough, compact side even harder to break down."
  },
  {
    slug: "fulham",
    name: "Fulham",
    heroTitle: "How Fulham can sharpen their wide combinations without losing their midfield poise.",
    heroDek: "Fulham's page concentrates on a balanced side that can look controlled one week and incisive the next. The analysis follows how full-backs, wingers and central midfielders share responsibility for rhythm and threat.",
    author: "Peter Rutzler",
    updated: "Updated 3 hours ago",
    note: "Balance lens",
    stats: [
      { label: "Base shape", number: "4-2-3-1", copy: "The structure is familiar, but the game often turns on how the full-backs support the winger ahead of them." },
      { label: "Press trigger", number: "Wide receive", copy: "Fulham's press has bite when the nearest midfielder arrives on the second touch rather than the first." },
      { label: "Key zone", number: "Wide triangles", copy: "The most dangerous moves appear when the flank has both depth and a short option inside." },
      { label: "Main tension", number: "Patience v speed", copy: "Too much caution slows the attack. Too much speed breaks the structure that makes Fulham solid." }
    ],
    articles: [
      { tag: "Flank play", title: "Why Fulham's best wing play starts with the midfielder, not the winger.", dek: "The support angle inside decides whether the defender can just force play wide and wait for help.", author: "Liam Tharme", meta: "8 min read · Today" },
      { tag: "Midfield", title: "The double pivot gives Fulham security, but one of the pair has to break the line sooner.", dek: "This is about when stability becomes passivity and how a single movement can tilt the whole possession.", author: "Mark Carey", meta: "9 min read · Yesterday" },
      { tag: "Pressing", title: "Fulham's press looks better when the centre-forward curves his run for the midfield behind him.", dek: "The first runner's angle shapes the whole trap and determines whether the pass into midfield remains available.", author: "Michael Cox", meta: "7 min read · 2 days ago" }
    ],
    notebook: "Fulham's page is designed around the tactical details that make a balanced team feel more dangerous without becoming loose."
  },
  {
    slug: "ipswich",
    name: "Ipswich",
    heroTitle: "How Ipswich can keep their bravery while adjusting to Premier League pressure.",
    heroDek: "Ipswich's page is about adaptation without surrender. It follows how an ambitious side can keep its principles on the ball while fine-tuning distances, exits and defensive spacing at a higher level.",
    author: "Stuart Watson",
    updated: "Updated 4 hours ago",
    note: "Adaptation lens",
    stats: [
      { label: "Base shape", number: "4-2-3-1", copy: "Ipswich still want controlled build-up, but the margins on timing and spacing are thinner at this level." },
      { label: "Press trigger", number: "Loose set", copy: "Their best pressure comes when the opponent's receiving shape hints that the next pass can be predicted." },
      { label: "Key zone", number: "Central access", copy: "Whether Ipswich can play into midfield cleanly often decides if their identity shows up at all." },
      { label: "Main tension", number: "Belief v pragmatism", copy: "The challenge is adjusting details without abandoning the courage that made the team distinctive." }
    ],
    articles: [
      { tag: "Build-up play", title: "Ipswich can still play through pressure if the distances around the six stay tighter.", dek: "The principle survives, but the support has to arrive a half-second sooner than it did in easier games.", author: "Mark Carey", meta: "8 min read · Today" },
      { tag: "Transitions", title: "The best way for Ipswich to relieve pressure may be one more early run into the channels.", dek: "Stretching the pitch vertically buys time for the midfield to recover its breath and shape behind the attack.", author: "Liam Tharme", meta: "9 min read · Yesterday" },
      { tag: "Defending", title: "How Ipswich can defend the box better without dropping ten yards deeper by default.", dek: "The answer lies in front-foot pressure on the crosser and cleaner roles at the edge of the area.", author: "Michael Cox", meta: "10 min read · 2 days ago" }
    ],
    notebook: "Ipswich's page watches the adjustments that let a brave Championship identity survive the sharper demands of the top flight."
  },
  {
    slug: "leicester",
    name: "Leicester City",
    shortName: "Leicester",
    heroTitle: "How Leicester can turn neat possession into attacks with real bite again.",
    heroDek: "Leicester's page is centred on a team that often finds the right spaces until the final stretch of the move. The analysis asks how cleaner timing and better occupation of the box can turn shape into threat.",
    author: "Rob Tanner",
    updated: "Updated 2 hours ago",
    note: "Final-third lens",
    stats: [
      { label: "Base shape", number: "4-3-3", copy: "The circulation can be tidy. The big question is what happens once the ball reaches the last line." },
      { label: "Press trigger", number: "Inside pass", copy: "Leicester look more convincing when the midfield jumps on the central receive rather than waiting for the next touch." },
      { label: "Key zone", number: "Penalty spot lane", copy: "The box needs more purposeful occupation if the possession is to end in proper chances." },
      { label: "Main tension", number: "Neatness v menace", copy: "A move can be well-constructed and still lack conviction at the moment that matters most." }
    ],
    articles: [
      { tag: "Attacking shape", title: "Why Leicester's wide players need one more diagonal run across the back line.", dek: "The current structure reaches good crossing zones but does not always destabilise the centre-backs once it gets there.", author: "Liam Tharme", meta: "8 min read · Today" },
      { tag: "Midfield", title: "The third midfielder has to become a runner, not just another recycler.", dek: "Possession becomes flatter when the final line never has to adjust to a late arrival from underneath.", author: "Mark Carey", meta: "9 min read · Yesterday" },
      { tag: "Pressing", title: "Leicester's press improves when the winger starts narrower and leaves the line later.", dek: "That small adjustment can close the central escape without sacrificing the ability to jump wide afterward.", author: "Michael Cox", meta: "7 min read · 3 days ago" }
    ],
    notebook: "Leicester's page is interested in the last part of the move: how a well-built attack actually becomes a dangerous one."
  },
  {
    slug: "liverpool",
    name: "Liverpool",
    heroTitle: "How Liverpool's new attacking patterns are stretching the pitch in smarter ways.",
    heroDek: "Liverpool's page looks at the tactical refinements that make a familiar intensity feel a little different. The emphasis is on spacing in possession, rest-defence shape and how the front line attacks the box.",
    author: "James Pearce",
    updated: "Updated 1 hour ago",
    note: "Attack lens",
    stats: [
      { label: "Base shape", number: "3-2-5", copy: "The structure gives Liverpool control behind the ball while still leaving room for aggressive final-third occupation." },
      { label: "Press trigger", number: "Backward touch", copy: "Once the opponent turns away from goal, Liverpool smell the chance to compress the pitch immediately." },
      { label: "Key zone", number: "Far-side wing", copy: "The switch is often what turns a stable possession into a defence scrambling across its own line." },
      { label: "Main tension", number: "Control v volume", copy: "The side can create plenty, but the challenge is doing so without loosening the rest-defence behind the move." }
    ],
    articles: [
      { tag: "Attack", title: "Why Liverpool's far-side winger is becoming the move's true finishing point.", dek: "The first overload often just prepares the picture for the switch that arrives a second later.", author: "Mark Carey", meta: "8 min read · Today" },
      { tag: "Midfield", title: "The double pivot is giving Liverpool cleaner rest-defence without flattening the build-up.", dek: "The shape looks calmer, but there is still enough variety ahead of it to threaten quickly.", author: "Michael Cox", meta: "10 min read · Yesterday" },
      { tag: "Pressing", title: "Liverpool's best presses still begin with the front line, but the midfield spacing is the hidden detail.", dek: "The jump only becomes dangerous if the second line is close enough to own the next touch as well.", author: "Liam Tharme", meta: "9 min read · 2 days ago" }
    ],
    notebook: "Liverpool's page follows the small structural changes that make a high-volume side look even more complete."
  },
  {
    slug: "man-city",
    name: "Manchester City",
    shortName: "Man City",
    heroTitle: "How Manchester City still create control before the rest of the game has even begun.",
    heroDek: "City's page is for readers who care about spacing, manipulation and the way a structure can solve the next pass before the ball even moves. It keeps the same site style, but the football discussion becomes more exacting.",
    author: "Sam Lee",
    updated: "Updated 2 hours ago",
    note: "Control lens",
    stats: [
      { label: "Base shape", number: "3-2-4-1", copy: "The naming matters less than the occupation of each lane and the patience with which City move opponents first." },
      { label: "Press trigger", number: "Broken shape", copy: "As soon as the opponent's support triangle distorts, City pounce and recover the ball in numbers." },
      { label: "Key zone", number: "Half-space pockets", copy: "That is where control turns into a final pass and where the best receivers see the game unfold early." },
      { label: "Main tension", number: "Tempo choice", copy: "Knowing exactly when to accelerate remains as important as the possession structure itself." }
    ],
    articles: [
      { tag: "Positional play", title: "City's full-backs do not disappear into midfield. They redraw the pitch from there.", dek: "The inversion changes passing angles, rest-defence coverage and the opponent's entire pressing map at once.", author: "Michael Cox", meta: "9 min read · Today" },
      { tag: "Attack", title: "The value of the extra pause before the cutback arrives.", dek: "City's chance creation often looks simple only because the timing before the final pass is so carefully chosen.", author: "Mark Carey", meta: "8 min read · Yesterday" },
      { tag: "Pressing", title: "Why City's counter-press feels like a second attack more than a defensive reaction.", dek: "The structure around the ball is built to win it back where the next pass is already obvious.", author: "Liam Tharme", meta: "10 min read · 2 days ago" }
    ],
    notebook: "Manchester City's page focuses on how control is manufactured through position, patience and the manipulation of defensive shape."
  },
  {
    slug: "man-utd",
    name: "Manchester United",
    shortName: "Man Utd",
    heroTitle: "How Manchester United can build a front-foot attack without losing their edge in chaos.",
    heroDek: "United's page keeps the same editorial palette as the homepage but gives supporters a dedicated tactics desk. The focus is on structure, pressing triggers and how the side can become cleaner with the ball without flattening what makes it dangerous.",
    author: "Carl Anka",
    updated: "Updated 2 hours ago",
    note: "United lens",
    stats: [
      { label: "Base shape", number: "3-2-5", copy: "The platform is there. The challenge is making the spacing ahead of the ball stable enough to support it." },
      { label: "Press trigger", number: "Wide trap", copy: "United look most forceful when the pass outside becomes the cue for the whole side to jump together." },
      { label: "Key zone", number: "Right half-space", copy: "That channel keeps deciding whether attacks feel improvised or properly connected." },
      { label: "Main tension", number: "Control v chaos", copy: "The aim is not to remove unpredictability, but to make it arrive from a stronger platform." }
    ],
    articles: [
      { tag: "Build-up play", title: "Why Lisandro Martinez is still the pass that unlocks United's best first-phase moves.", dek: "The value is not only his range, but the speed with which he changes the opponent's first line of pressure.", author: "Mark Carey", meta: "8 min read · Today" },
      { tag: "Attacking shape", title: "How United's right side looks better when the rotations happen before the ball gets there.", dek: "The combination play improves when the positions are prepared a beat earlier and the receiver arrives facing forward.", author: "Liam Tharme", meta: "10 min read · Yesterday" },
      { tag: "Pressing", title: "United's first wave is energetic enough. The real issue is the spacing behind it.", dek: "The most revealing footage is what happens after the initial jump, when the second line must secure the trap or the game opens up.", author: "Michael Cox", meta: "9 min read · 2 days ago" }
    ],
    notebook: "Manchester United's page is built around the tension between structure and spontaneity, because that is where so much of the team still lives."
  },
  {
    slug: "newcastle",
    name: "Newcastle United",
    shortName: "Newcastle",
    heroTitle: "How Newcastle can keep their tempo high without letting the whole match become stretched.",
    heroDek: "Newcastle's page looks at one of the league's most physical, front-foot teams and asks how their aggressive style can remain coherent when the game threatens to become a sequence of transitions.",
    author: "Chris Waugh",
    updated: "Updated 3 hours ago",
    note: "Tempo lens",
    stats: [
      { label: "Base shape", number: "4-3-3", copy: "The midfield triangle drives the game, but its distances have to stay compact enough to support the press." },
      { label: "Press trigger", number: "Wide set-up", copy: "Once the pass heads outside, Newcastle's nearest three players attack the picture with conviction." },
      { label: "Key zone", number: "Counter-press ring", copy: "The first few yards after a turnover decide whether Newcastle sustain pressure or get pulled into a race." },
      { label: "Main tension", number: "Intensity v calm", copy: "The side do not need less energy; they need clearer moments to breathe between surges." }
    ],
    articles: [
      { tag: "Pressing", title: "Newcastle's best defensive moments are really about where the midfield three stand before the pass.", dek: "The trap succeeds when the distances are short enough that the second duel is already covered.", author: "Michael Cox", meta: "8 min read · Today" },
      { tag: "Attack", title: "Why Newcastle's left side can become a true chance factory with one extra underlap.", dek: "The wide player attracts the line, but the runner inside him is often the movement that actually breaks it.", author: "Liam Tharme", meta: "9 min read · Yesterday" },
      { tag: "Game control", title: "How Newcastle can make fast matches feel a little more selective.", dek: "This is not about slowing down by default. It is about choosing which moments deserve full acceleration.", author: "Mark Carey", meta: "10 min read · 2 days ago" }
    ],
    notebook: "Newcastle's page tracks the mechanics that let a high-intensity side keep both force and shape at the same time."
  },
  {
    slug: "nottm-forest",
    name: "Nottingham Forest",
    shortName: "Nottm Forest",
    heroTitle: "How Nottingham Forest can stay dangerous in transition while adding one more layer of control.",
    heroDek: "Forest's page focuses on the mechanics of a side that can attack space quickly and defend deep with purpose. The question is what tactical additions can help them own a little more of the match in between.",
    author: "Paul Taylor",
    updated: "Updated 4 hours ago",
    note: "Transition lens",
    stats: [
      { label: "Base shape", number: "4-2-3-1", copy: "The shape gives Forest a platform for quick exits, especially when the wide players begin slightly narrower." },
      { label: "Press trigger", number: "Mistimed set", copy: "Forest are most assertive when the opponent's first touch shapes the press for them." },
      { label: "Key zone", number: "Open grass", copy: "No team identity is clearer than how quickly Forest try to attack the space beyond the midfield line." },
      { label: "Main tension", number: "Directness v retention", copy: "There are moments to break quickly and moments where one extra pass keeps the next attack alive." }
    ],
    articles: [
      { tag: "Transitions", title: "Forest's wide runners are most dangerous when the first pass arrives diagonally, not straight.", dek: "The angle buys separation from the recovering defender and opens the pitch for the second action.", author: "Mark Carey", meta: "8 min read · Today" },
      { tag: "Midfield", title: "The double pivot's next step is not more tackles. It is one calmer pass after the regain.", dek: "Survival sides improve fastest when the first possession after winning the ball becomes more reliable.", author: "Liam Tharme", meta: "9 min read · Yesterday" },
      { tag: "Defending", title: "How Forest can protect the box without inviting the cutback by default.", dek: "This comes down to who steps to the crosser and how the weak-side full-back reads the far-post run.", author: "Michael Cox", meta: "10 min read · 3 days ago" }
    ],
    notebook: "Nottingham Forest's page follows the details that help a transition side add just enough control to become harder to pin down."
  },
  {
    slug: "southampton",
    name: "Southampton",
    heroTitle: "How Southampton can keep building bravely when the pressure gets louder.",
    heroDek: "Southampton's page is aimed at readers who care about construction under stress: first-phase angles, support distances and the courage required to play through pressure without becoming reckless.",
    author: "Nancy Froston",
    updated: "Updated 5 hours ago",
    note: "Courage lens",
    stats: [
      { label: "Base shape", number: "4-3-3", copy: "The idea is clean enough. The problem is making the support picture stable under more aggressive pressing." },
      { label: "Press trigger", number: "Jump lane", copy: "Southampton can still be proactive if the nearest midfielder attacks the next pass, not just the first one." },
      { label: "Key zone", number: "Six-space", copy: "The quality of the first receiver in front of the defence often decides whether the move survives at all." },
      { label: "Main tension", number: "Principle v punishment", copy: "Brave football is still worth pursuing, but the margins for technical error are smaller now." }
    ],
    articles: [
      { tag: "Build-up play", title: "The half-turn in midfield is still Southampton's most valuable technical action.", dek: "Everything opens once the first central receiver can turn and force the block to run backward rather than forward.", author: "Mark Carey", meta: "8 min read · Today" },
      { tag: "Defending", title: "Southampton do not need to abandon the high line. They need better pressure on the ball ahead of it.", dek: "The issue is often upstream of the defenders themselves, not simply the defenders' starting height.", author: "Michael Cox", meta: "9 min read · Yesterday" },
      { tag: "Adaptation", title: "How Southampton can choose safer zones without losing the identity of the build.", dek: "The smartest adaptation is not to go long all the time, but to become more selective about where the risk begins.", author: "Liam Tharme", meta: "10 min read · 2 days ago" }
    ],
    notebook: "Southampton's page is about what brave possession looks like when every opponent is more prepared to punish it."
  },
  {
    slug: "spurs",
    name: "Tottenham Hotspur",
    shortName: "Spurs",
    heroTitle: "How Spurs can keep their attacking ambition while reducing the size of the counter behind it.",
    heroDek: "Spurs' page is built around a recognisable trade-off: they want to attack with conviction and numbers, but the structure behind those attacks has to survive when the first press is broken.",
    author: "Jack Pitt-Brooke",
    updated: "Updated 2 hours ago",
    note: "Risk lens",
    stats: [
      { label: "Base shape", number: "2-3-5", copy: "The front-five occupation is aggressive and clear; the question is how secure the layer behind it feels." },
      { label: "Press trigger", number: "First loose pass", copy: "Spurs want to win the ball back before the opponent has fully escaped the first wave." },
      { label: "Key zone", number: "Rest-defence line", copy: "The distance between the centre-backs and midfield screen shapes how frightening counters become." },
      { label: "Main tension", number: "Ambition v exposure", copy: "The solution is not less bravery, but more precise spacing behind the attack." }
    ],
    articles: [
      { tag: "Rest defence", title: "Why Spurs' counter-prevention starts with the full-backs, not the centre-backs.", dek: "The first security layer is often decided by where the inverting full-back stands before the turnover even happens.", author: "Michael Cox", meta: "9 min read · Today" },
      { tag: "Attack", title: "Spurs' front line is at its best when the central runner arrives after the ball, not with it.", dek: "That delayed timing creates a more complicated picture for defenders already occupied by the width either side.", author: "Liam Tharme", meta: "8 min read · Yesterday" },
      { tag: "Midfield", title: "How one extra conservative midfielder movement can protect Spurs without muting them.", dek: "This is about picking one stabilising role inside a very aggressive structure, not redesigning the whole idea.", author: "Mark Carey", meta: "10 min read · 2 days ago" }
    ],
    notebook: "Spurs' page follows the tactical compromise every expansive team must eventually solve: how to attack big without leaving the whole pitch behind them."
  },
  {
    slug: "west-ham",
    name: "West Ham United",
    shortName: "West Ham",
    heroTitle: "How West Ham can combine direct threat with cleaner control between the boxes.",
    heroDek: "West Ham's page tracks a side that can punish teams quickly but still has room to improve its connection through midfield. The analysis asks how to keep the edge while smoothing the phases around it.",
    author: "Roshane Thomas",
    updated: "Updated 3 hours ago",
    note: "Connection lens",
    stats: [
      { label: "Base shape", number: "4-2-3-1", copy: "The shape can support both direct vertical attacks and calmer spells if the midfield distances remain short enough." },
      { label: "Press trigger", number: "Sideways receive", copy: "West Ham can be selective, but their best moments come when the jump is made with conviction rather than halfway." },
      { label: "Key zone", number: "Midfield links", copy: "The central connectors decide whether the attack reaches the forwards with shape or with hope." },
      { label: "Main tension", number: "Directness v support", copy: "Going forward quickly is useful only if enough of the team can arrive to sustain the move afterward." }
    ],
    articles: [
      { tag: "Build-up play", title: "West Ham's forwards are easier to find when the eight drops in for one touch first.", dek: "That brief extra connection step can open the vertical lane instead of forcing it against set defenders.", author: "Liam Tharme", meta: "8 min read · Today" },
      { tag: "Attack", title: "The wide service is there. The next step is arriving with one more body in the box.", dek: "Plenty of attacks reach crossing zones, but the occupation inside the area does not always match the quality of the delivery.", author: "Mark Carey", meta: "9 min read · Yesterday" },
      { tag: "Pressing", title: "Why West Ham's press looks sharper when the striker protects the pivot first.", dek: "The first run changes the whole map if it removes the easiest central outlet from the opponent's picture.", author: "Michael Cox", meta: "10 min read · 2 days ago" }
    ],
    notebook: "West Ham's page is about better connections between the moments they already do well, rather than forcing them into a different identity."
  },
  {
    slug: "wolves",
    name: "Wolverhampton Wanderers",
    shortName: "Wolves",
    heroTitle: "How Wolves can stay compact and clever while adding more conviction in the final third.",
    heroDek: "Wolves' page follows a team that often looks well-schooled without always looking ruthless. The tactical focus is on where the side can be a little bolder without breaking its shape behind the move.",
    author: "Steve Madeley",
    updated: "Updated 4 hours ago",
    note: "Compactness lens",
    stats: [
      { label: "Base shape", number: "3-4-2-1", copy: "The back three and narrow attacking midfielders give Wolves a structure that can be both cautious and surprisingly sharp." },
      { label: "Press trigger", number: "Wide hold-up", copy: "Wolves attack the touchline well when the nearest forward and wing-back coordinate the squeeze." },
      { label: "Key zone", number: "Edge of box", copy: "Many of their best moves arrive just outside the area, where the last choice determines whether the attack lives or dies." },
      { label: "Main tension", number: "Security v aggression", copy: "The side have enough structure. The question is when to commit the extra runner and trust it." }
    ],
    articles: [
      { tag: "Final third", title: "Wolves need one more runner beyond the striker when the wing-back reaches delivery height.", dek: "The move is often built well enough, but the box picture can still feel under-occupied when the cross arrives.", author: "Mark Carey", meta: "8 min read · Today" },
      { tag: "Structure", title: "The narrow tens help Wolves connect the pitch, but one has to threaten the last line sooner.", dek: "Dropping to receive is useful; threatening depth is what stops the defence stepping out on the next pass.", author: "Liam Tharme", meta: "9 min read · Yesterday" },
      { tag: "Defending", title: "Why Wolves' back three defend better when the midfield screen starts five yards higher.", dek: "The small shift reduces the space attackers can receive into and helps the centre-backs stay patient behind it.", author: "Michael Cox", meta: "10 min read · 3 days ago" }
    ],
    notebook: "Wolves' page watches the subtle tactical choices that can turn a solid structure into a more ambitious attacking platform."
  }
];

const pitchSvg = `
  <svg class="team-pitch-lines" viewBox="0 0 600 420" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="1" y="1" width="598" height="418" rx="14" stroke="#c9c6c5" stroke-width="2"/>
    <line x1="300" y1="1" x2="300" y2="419" stroke="#c9c6c5" stroke-width="2"/>
    <circle cx="300" cy="210" r="62" stroke="#c9c6c5" stroke-width="2"/>
    <circle cx="300" cy="210" r="3" fill="#c9c6c5"/>
    <rect x="190" y="1" width="220" height="62" stroke="#c9c6c5" stroke-width="2"/>
    <rect x="190" y="357" width="220" height="62" stroke="#c9c6c5" stroke-width="2"/>
    <rect x="246" y="1" width="108" height="20" stroke="#c9c6c5" stroke-width="2"/>
    <rect x="246" y="399" width="108" height="20" stroke="#c9c6c5" stroke-width="2"/>
  </svg>
`;

const formationNodes = [
  { className: "team-node", style: "grid-column: 2; grid-row: 1;" },
  { className: "team-node alt", style: "grid-column: 3; grid-row: 1;" },
  { className: "team-node", style: "grid-column: 1; grid-row: 2;" },
  { className: "team-node", style: "grid-column: 2; grid-row: 2;" },
  { className: "team-node alt", style: "grid-column: 3; grid-row: 2;" },
  { className: "team-node", style: "grid-column: 4; grid-row: 2;" },
  { className: "team-node alt", style: "grid-column: 1; grid-row: 3;" },
  { className: "team-node", style: "grid-column: 2; grid-row: 3;" },
  { className: "team-node", style: "grid-column: 3; grid-row: 3;" },
  { className: "team-node alt", style: "grid-column: 4; grid-row: 3;" },
  { className: "team-node", style: "grid-column: 2 / span 2; grid-row: 4;" }
];

const renderStats = (stats) =>
  stats
    .map(
      (stat) => `
        <div class="team-stat-card">
          <div class="team-stat-label">${stat.label}</div>
          <div class="team-stat-number">${stat.number}</div>
          <div class="team-stat-copy">${stat.copy}</div>
        </div>
      `
    )
    .join("");

const renderArticles = (articles) =>
  articles
    .map(
      (article) => `
        <article class="team-story-card">
          <span class="team-chip">${article.tag}</span>
          <h3 class="team-story-title">${article.title}</h3>
          <p class="team-story-dek">${article.dek}</p>
          <div class="team-story-meta">
            <strong>${article.author}</strong>
            <span>·</span>
            <span>${article.meta}</span>
          </div>
        </article>
      `
    )
    .join("");

const renderFormation = () =>
  formationNodes
    .map((node) => `<div class="${node.className}" style="${node.style}"></div>`)
    .join("");

const renderPage = (team) => {
  const shortName = team.shortName ?? team.name;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${team.name} Tactics | The Athletic UK</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700&family=Newsreader:opsz,wght@6..72,400;6..72,600;6..72,700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="team-page.css">
</head>
<body>
  <nav class="team-nav" aria-label="${team.name} section">
    <div class="team-nav-inner">
      <div class="team-brand-block">
        <a class="team-back-link" href="index.html">← All football</a>
        <div class="team-brand-title">${team.name} <span>Tactics</span></div>
      </div>
      <ul class="team-nav-links" role="list">
        <li><a class="team-nav-link active" href="#">Latest</a></li>
        <li><a class="team-nav-link" href="#">Structures</a></li>
        <li><a class="team-nav-link" href="#">Pressing</a></li>
        <li><a class="team-nav-link" href="#">Build-up</a></li>
        <li><a class="team-nav-link" href="#">Profiles</a></li>
      </ul>
    </div>
  </nav>

  <header class="team-hero">
    <div class="team-shell team-hero-grid">
      <section class="team-hero-main">
        <div class="team-kicker-row">
          <span class="team-chip live">Club view</span>
          <span class="team-chip">${shortName} notebook</span>
          <span class="team-chip">Tactical analysis</span>
        </div>

        <div>
          <h1 class="team-hero-title">${team.heroTitle}</h1>
          <p class="team-hero-dek">${team.heroDek}</p>
        </div>

        <div class="team-meta">
          <strong>${team.author}</strong>
          <span>·</span>
          <span>9 min read</span>
          <span>·</span>
          <span>${team.updated}</span>
        </div>

        <div class="team-hero-board" aria-hidden="true">
          ${pitchSvg}
          <div class="team-formation">
            ${renderFormation()}
          </div>
        </div>
      </section>

      <aside class="team-hero-side">
        <div class="team-section-head">
          <h2 class="team-section-title">Match model</h2>
          <span class="team-section-note">${team.note}</span>
        </div>

        <div class="team-stat-grid">
          ${renderStats(team.stats)}
        </div>

        <a class="team-cta" href="#tactics-feed">Read the latest tactical pieces</a>
      </aside>
    </div>
  </header>

  <main class="team-shell team-main-grid">
    <section class="team-analysis-panel" id="tactics-feed">
      <div class="team-section-head">
        <h2 class="team-section-title">Latest tactics articles</h2>
        <span class="team-section-note">Cohesive team page model</span>
      </div>

      <div class="team-analysis-list">
        ${renderArticles(team.articles)}
      </div>
    </section>

    <aside class="team-side-rail">
      <section class="team-index-card">
        <h2 class="team-index-title">What this page covers</h2>
        <ol class="team-index-list">
          <li>
            <span class="team-index-num">01</span>
            <span class="team-index-copy">The tactical decisions shaping ${shortName}'s current identity, from first phase to final-third detail.</span>
          </li>
          <li>
            <span class="team-index-num">02</span>
            <span class="team-index-copy">A team-specific reading environment that still belongs to the same overall site system and visual language.</span>
          </li>
          <li>
            <span class="team-index-num">03</span>
            <span class="team-index-copy">Repeatable structure for future club pages, so every team gets depth without the website losing cohesion.</span>
          </li>
        </ol>
      </section>

      <section class="team-rail-panel">
        <div class="team-rail-head">Notebook</div>
        <div class="team-rail-body">
          <p class="team-rail-copy"><strong>${shortName} lens:</strong> ${team.notebook}</p>
        </div>
      </section>

      <section class="team-rail-panel">
        <div class="team-rail-head">Reader promise</div>
        <div class="team-rail-body">
          <p class="team-rail-copy">Every club page keeps the main site's premium editorial palette and spacing so the product feels consistent, while the football ideas, examples and article framing shift to the questions that matter most for ${shortName}.</p>
        </div>
      </section>
    </aside>
  </main>

  <footer class="team-shell team-footer">
    <div class="team-footer-links">
      <span>${team.name} tactics vertical</span>
      <a class="team-subtle-link" href="index.html">Return to homepage</a>
    </div>
  </footer>
</body>
</html>`;
};

for (const team of teams) {
  writeFileSync(join(process.cwd(), `${team.slug}.html`), renderPage(team));
}

console.log(`Generated ${teams.length} team pages.`);
