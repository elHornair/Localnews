<?php

    require_once('PointInPolygon.php');

    $point = json_decode(stripslashes($_POST['point']), true);

    // define regions
    $west = '[{"x":6.876609314378934,"y":47.18022834134132},{"x":6.887732662218537,"y":47.115246882046996},{"x":7.05458287981258,"y":47.14773761169416},{"x":7.099076271170992,"y":47.099001517223414},{"x":7.05458287981258,"y":47.001529328281926},{"x":7.24367979308583,"y":47.03402005792909},{"x":7.221433097406624,"y":46.92030250416402},{"x":7.388283315000669,"y":46.87968909210507},{"x":7.3104198801234475,"y":46.725358126281044},{"x":7.421653358519476,"y":46.68474471422209},{"x":7.377159967161065,"y":46.64413130216314},{"x":7.32154322796305,"y":46.5872725252806},{"x":7.265926488765036,"y":46.54665911322165},{"x":7.254803140925433,"y":46.44918692428016},{"x":7.221433097406624,"y":46.35983741775046},{"x":7.265926488765036,"y":46.311101323279715},{"x":7.343789923642257,"y":46.351714735338675},{"x":7.455023402038286,"y":46.35983741775046},{"x":7.566256880434315,"y":46.35983741775046},{"x":7.6107502717927265,"y":46.39232814739763},{"x":7.677490358830344,"y":46.424818877044785},{"x":7.733107098028359,"y":46.38420546498583},{"x":7.866587272103594,"y":46.46543228910374},{"x":8.011190794018432,"y":46.52229106598627},{"x":8.122424272414461,"y":46.538536430809856},{"x":8.211411055131284,"y":46.4979230187509},{"x":8.400507968404535,"y":46.562904478045226},{"x":8.400507968404535,"y":46.611640572515974},{"x":8.400507968404535,"y":46.611640572515974},{"x":8.456124707602548,"y":46.64413130216314},{"x":8.445001359762946,"y":46.562904478045226},{"x":8.489494751121358,"y":46.4979230187509},{"x":8.456124707602548,"y":46.48167765392732},{"x":8.433878011923344,"y":46.44106424186837},{"x":8.411631316244137,"y":46.424818877044785},{"x":8.344891229206521,"y":46.34359205292688},{"x":8.23365775081049,"y":46.27048791122076},{"x":8.178041011612475,"y":46.24611986398539},{"x":8.222534402970886,"y":46.164893039867486},{"x":8.189164359452079,"y":46.09991158057316},{"x":8.089054228895652,"y":46.051175486102416},{"x":8.055684185376844,"y":45.9780713443963},{"x":7.944450706980815,"y":45.92933524992556},{"x":7.933327359141211,"y":45.86435379063123},{"x":7.755353793707565,"y":45.86435379063123},{"x":7.588503576113521,"y":45.913089885101975},{"x":7.455023402038286,"y":45.84810842580765},{"x":7.332666575802653,"y":45.823740378572275},{"x":7.099076271170992,"y":45.799372331336905},{"x":6.921102705737345,"y":45.99431670921988},{"x":6.820992575180918,"y":46.059298168514204},{"x":6.765375835982904,"y":46.140524992632116},{"x":6.809869227341316,"y":46.25424254639719},{"x":6.643019009747272,"y":46.27861059363256},{"x":6.342688618077993,"y":46.19738376951465},{"x":6.175838400483949,"y":46.09991158057316},{"x":5.953371443691891,"y":46.09178889816137},{"x":5.920001400173082,"y":46.20550645192644},{"x":6.053481574248317,"y":46.237997181573604},{"x":6.120221661285934,"y":46.34359205292688},{"x":6.020111530729508,"y":46.424818877044785},{"x":6.086851617767126,"y":46.538536430809856},{"x":6.053481574248317,"y":46.59539520769239},{"x":6.387182009436405,"y":46.78221690316358},{"x":6.387182009436405,"y":46.96091591622297},{"x":6.420552052955213,"y":47.00965201069372},{"x":6.665265705426478,"y":47.07463346998804},{"x":6.654142357586875,"y":47.13149224687058},{"x":6.832115923020522,"y":47.212719070988484}]';
    $mittelland = '[{"x":6.876609314378934,"y":47.1964737061649},{"x":6.943349401416551,"y":47.302068577518185},{"x":7.05458287981258,"y":47.375172719224295},{"x":6.909979357897742,"y":47.39954076645967},{"x":6.954472749256154,"y":47.488890272989366},{"x":6.998966140614566,"y":47.5457490498719},{"x":7.188063053887816,"y":47.53762636746011},{"x":7.410530010679874,"y":47.415786131283255},{"x":7.6107502717927265,"y":47.440154178518625},{"x":7.733107098028359,"y":47.375172719224295},{"x":7.944450706980815,"y":47.47264490816578},{"x":8.022314141858036,"y":47.42390881369504},{"x":7.844340576424388,"y":47.326436624753555},{"x":7.844340576424388,"y":47.15586029410595},{"x":7.866587272103594,"y":47.05026542275267},{"x":7.955574054820417,"y":47.00965201069372},{"x":7.844340576424388,"y":46.87968909210507},{"x":7.955574054820417,"y":46.79846226798716},{"x":8.23365775081049,"y":46.76597153834},{"x":8.433878011923344,"y":46.76597153834},{"x":8.400507968404535,"y":46.64413130216314},{"x":8.389384620564933,"y":46.5060457011627},{"x":7.265926488765036,"y":46.18926108710286},{"x":7.076829575491786,"y":46.44918692428016},{"x":7.16581635820861,"y":46.80658495039895},{"x":6.820992575180918,"y":47.090878834811626},{"x":6.798745879501713,"y":47.2045963885767}]';
    $zentral = '[{"x":7.7998471850659765,"y":47.24520980063565},{"x":7.922204011301608,"y":47.26957784787102},{"x":7.988944098339227,"y":47.31019125992997},{"x":8.133547620254063,"y":47.2858232126946},{"x":8.278151142168902,"y":47.33455930716534},{"x":8.356014577046123,"y":47.15586029410595},{"x":8.400507968404535,"y":47.25333248304744},{"x":8.567358185998579,"y":47.24520980063565},{"x":8.645221620875798,"y":47.1964737061649},{"x":8.789825142790637,"y":47.25333248304744},{"x":9.001168751743092,"y":47.237087118223855},{"x":8.967798708224283,"y":47.115246882046996},{"x":8.901058621186667,"y":47.03402005792909},{"x":9.001168751743092,"y":46.96091591622297},{"x":8.945552012545077,"y":46.87968909210507},{"x":8.867688577667858,"y":46.80658495039895},{"x":8.700838360073814,"y":46.68474471422209},{"x":8.68971501223421,"y":46.562904478045226},{"x":8.545111490319371,"y":46.562904478045226},{"x":8.511741446800563,"y":46.53041374839807},{"x":8.456124707602548,"y":46.514168383574486},{"x":8.289274490008506,"y":46.68474471422209},{"x":7.788723837226374,"y":46.74160349110463},{"x":7.721983750188755,"y":47.237087118223855}]';
    $nord = '[{"x":7.332666575802653,"y":47.47264490816578},{"x":7.455023402038286,"y":47.5457490498719},{"x":7.5106401412363,"y":47.61885319157802},{"x":7.677490358830344,"y":47.65946660363697},{"x":7.644120315311536,"y":47.578239779519066},{"x":7.822093880745182,"y":47.65946660363697},{"x":7.944450706980815,"y":47.61885319157802},{"x":8.189164359452079,"y":47.68383465087234},{"x":8.378261272725329,"y":47.64322123881339},{"x":8.567358185998579,"y":47.68383465087234},{"x":8.789825142790637,"y":47.69195733328414},{"x":8.901058621186667,"y":47.561994414695484},{"x":8.901058621186667,"y":47.43203149610683},{"x":9.001168751743092,"y":47.34268198957714},{"x":8.823195186309446,"y":47.25333248304744},{"x":8.789825142790637,"y":47.163982976517744},{"x":8.300397837848108,"y":47.06651078757625},{"x":7.299296532283845,"y":47.40766344887146}]';
    $ost = '[{"x":8.61185157735699,"y":47.69195733328414},{"x":8.400507968404535,"y":47.69195733328414},{"x":8.378261272725329,"y":47.75693879257846},{"x":8.53398814247977,"y":47.84628829910816},{"x":8.711961707913417,"y":47.79755220463741},{"x":8.856565229828254,"y":47.74881611016667},{"x":9.001168751743092,"y":47.74881611016667},{"x":9.368239230449989,"y":47.61885319157802},{"x":9.568459491562841,"y":47.52950368504832},{"x":9.679692969958872,"y":47.49701295540116},{"x":9.701939665638076,"y":47.40766344887146},{"x":9.501719404525224,"y":47.18022834134132},{"x":9.546212795883637,"y":47.07463346998804},{"x":9.735309709156887,"y":47.06651078757625},{"x":9.90215992675093,"y":47.025897375517296},{"x":9.879913231071724,"y":46.952793233811185},{"x":10.02451675298656,"y":46.91217982175223},{"x":10.09125684002418,"y":46.839075680046115},{"x":10.224737014099414,"y":46.87156640969327},{"x":10.235860361939018,"y":46.952793233811185},{"x":10.313723796816237,"y":46.952793233811185},{"x":10.424957275212266,"y":47.001529328281926},{"x":10.525067405768693,"y":46.92842518657581},{"x":10.413833927372664,"y":46.66037666698672},{"x":10.513944057929091,"y":46.59539520769239},{"x":10.502820710089487,"y":46.52229106598627},{"x":10.28035375329743,"y":46.55478179563344},{"x":10.224737014099414,"y":46.611640572515974},{"x":10.069010144344972,"y":46.5060457011627},{"x":10.080133492184576,"y":46.4085735122212},{"x":10.202490318420207,"y":46.38420546498583},{"x":10.146873579222195,"y":46.286733276044345},{"x":10.224737014099414,"y":46.20550645192644},{"x":10.080133492184576,"y":46.18113840469107},{"x":9.968900013788549,"y":46.27048791122076},{"x":9.935529970269737,"y":46.311101323279715},{"x":9.679692969958872,"y":46.22987449916181},{"x":9.490596056685622,"y":46.30297864086793},{"x":9.4127326218084,"y":46.424818877044785},{"x":9.290375795572768,"y":46.44918692428016},{"x":9.279252447733166,"y":46.376082782574045},{"x":9.301499143412371,"y":46.27048791122076},{"x":9.079032186620314,"y":46.002439391631675},{"x":9.045662143101504,"y":45.86435379063123},{"x":9.123525577978725,"y":45.79124964892512},{"x":9.034538795261902,"y":45.70190014239542},{"x":8.901058621186667,"y":45.73439087204258},{"x":8.901058621186667,"y":45.85623110821944},{"x":8.756455099271829,"y":45.90496720269018},{"x":8.789825142790637,"y":46.002439391631675},{"x":8.667468316555006,"y":46.01056207404346},{"x":8.545111490319371,"y":46.09178889816137},{"x":8.522864794640167,"y":46.164893039867486},{"x":8.400507968404535,"y":46.19738376951465},{"x":8.400507968404535,"y":46.27048791122076},{"x":8.400507968404535,"y":46.45730960669195},{"x":8.367137924885725,"y":46.4979230187509},{"x":8.734208403592621,"y":47.22896443581207},{"x":8.622974925196592,"y":47.69195733328414}]';

    $regions = array(
        array(
            'index' => 1,
            'title' => 'Westschweiz',
            'articles' => array(
                array(
                    'title' => '<h2>Some Westschweiz article yeah</h2><p class="subtitle">this is some additional information that is always visible</p>',
                    'body' => '<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>'
                ),
                array(
                    'title' => '<h2>Headline of the second Westschweiz</h2><p class="subtitle">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.</p>',
                    'body' => '<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>'
                ),
                array(
                    'title' => '<h2>Third westschweiz article</h2><p class="subtitle">this is an interesting subtitle. wanna read the article?</p>',
                    'body' => '<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>'
                )
            ),
            'boundings' => json_decode($west, true)
        ),
        array(
            'index' => 2,
            'title' => 'Mittelland',
            'articles' => array(
                array(
                    'title' => '<h2>Some Mittelland article yeah</h2><p class="subtitle">this is some additional information that is always visible</p>',
                    'body' => '<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>'
                ),
                array(
                    'title' => '<h2>Headline of the second Mittelland</h2><p class="subtitle">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.</p>',
                    'body' => '<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>'
                ),
                array(
                    'title' => '<h2>Third Mittelland article</h2><p class="subtitle">this is an interesting subtitle. wanna read the article?</p>',
                    'body' => '<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>'
                )
            ),
            'boundings' => json_decode($mittelland, true)
        ),
        array(
            'index' => 3,
            'title' => 'Zentralschweiz',
            'articles' => array(
                array(
                    'title' => '<h2>Some Zentralschweiz article yeah</h2><p class="subtitle">this is some additional information that is always visible</p>',
                    'body' => '<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>'
                ),
                array(
                    'title' => '<h2>Headline of the second Zentralschweiz</h2><p class="subtitle">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.</p>',
                    'body' => '<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>'
                ),
                array(
                    'title' => '<h2>Third Zentralschweiz article</h2><p class="subtitle">this is an interesting subtitle. wanna read the article?</p>',
                    'body' => '<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>'
                )
            ),
            'boundings' => json_decode($zentral, true)
        ),
        array(
            'index' => 4,
            'title' => 'Zürich und Nordwestschweiz',
            'articles' => array(
                array(
                    'title' => '<h2>Some Nordwestschweiz article yeah</h2><p class="subtitle">this is some additional information that is always visible</p>',
                    'body' => '<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>'
                ),
                array(
                    'title' => '<h2>Headline of the second Zürich</h2><p class="subtitle">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.</p>',
                    'body' => '<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>'
                ),
                array(
                    'title' => '<h2>Third Zürich article</h2><p class="subtitle">this is an interesting subtitle. wanna read the article?</p>',
                    'body' => '<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>'
                )
            ),
            'boundings' => json_decode($nord, true)
        ),
        array(
            'index' => 5,
            'title' => 'Ostschweiz',
            'articles' => array(
                array(
                    'title' => '<h2>Some Ostschweiz article yeah</h2><p class="subtitle">this is some additional information that is always visible</p>',
                    'body' => '<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>'
                ),
                array(
                    'title' => '<h2>Headline of the second Ostschweiz</h2><p class="subtitle">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.</p>',
                    'body' => '<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>'
                ),
                array(
                    'title' => '<h2>Third Ostschweiz article</h2><p class="subtitle">this is an interesting subtitle. wanna read the article?</p>',
                    'body' => '<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>'
                )
            ),
            'boundings' => json_decode($ost, true)
        )
    );

    $targetRegion = array(
        'index' => 0,
        'name' => 'none'
    );

    for ($i = 0; $i < count($regions); $i++) {
        if (PointInPolygon::isPointInPolygon($regions[$i]['boundings'], $point) != -1) {
            unset($regions[$i]['boundings']);
            $targetRegion = $regions[$i];
            break;
        }
    }

    echo json_encode($targetRegion);

?>