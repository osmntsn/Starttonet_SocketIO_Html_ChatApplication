!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head><title>

</title><link href="Content/bootstrap.min.css" rel="stylesheet" /><link href="Content/prism.css" rel="stylesheet" /><link href="Content/style.css" rel="stylesheet" /></head>
<body>

    <form name="form1" method="post" action="Default.aspx" id="form1">
<div>
<input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="/wEPDwULLTE1ODc3MzM5NjRkZFK9Y9YwyFnkrvD3eniGYXWJwOfK" />
</div>


        <div class="container">
            <div class="col-xs-12">
                <h3>PROJEYE SOCKETIO’NUN EKLENMESİ</h3>
                <p>SocketIOyu JavaScript ile kullanabilmek için SocketIO’nun JavaScript Client scripti uygulamaya eklenmelidir. Aşağıdaki kodun SocketIO bağlantısı kurulmadan ve fonksiyonları yazılmadan önce Web sayfasına eklenmiş olması gerekir.</p>
                <pre class="language-javascript">
<code class="language-javascript">
&lt;script src=&quot;https://cdn.socket.io/socket.io-1.1.0.js&quot;&gt;&lt;/script&gt;
</code>
                </pre>
                <h3>BAĞLANTININ KURULMASI</h3>
                <p>
                    Bağlantının kurulması için öncelikle global olarak socket isminde (veya istenilen bir isimde ) bir nesne oluşturulmalıdır. Nesnenin global olarak oluşturulmasının sebebi bu nesne ile hem veri alacağız hem de veri göndereceğiz ve veri gönderme işlemi farklı fonksiyonlar tarafından da yapılabileceği için socket nesnesi global tanımlanmalıdır.
                </p>
                <p>
                    Daha sonra connecttoStarttonet fonksiyonuna benzer bir fonksiyon hazırlanmalıdır. Bu fonksiyonda  socket = io.connect("http://www.starttonet.com:8888"); komutuyla Starttonet sunucusuna bağlantı başlatılır. Daha sonra socket.on() ile başlayan tüm fonsiyonlar başlangıçta oluşturulan connectoStarttonet fonksiyonu içerisinde yazılmalıdır.
                </p>


                <pre class="language-javascript">
<code class="language-javascript">
var socket = null;

function connectoStarttonet(apiKey,socketName) {
    if (socket == null) {
        socket = io.connect("http://www.starttonet.com:8888");
       //socket.on() fonksiyonları bu kısıma yazılmalı
    }
   else{
       alert(“Bağlantı daha önce kurulmuş”);
   }
}

</code>
                </pre>
                <h3>BAĞLANTININ AYARLARININ YAPILMASI</h3>
                <p>
                    İlk bağlantının sağlanması aşağıdaki şekilde gerçekleşmelidir. Aşağıdaki fonksiyon socket ile Starttonet arasındaki bağlantı kurulduğunda çalışır. İlk bağlantı kurulduğunda socketin starttonet e hangi apiKey ile bağlandığını söylemesi zorunludur. Ancak sockete isim verip vermemek kullanıcının seçimine bırakılmıştır. Eğer kullanıcı socket ismini kendi verirse daha sonra bu isimleri kullanarak istediği sockete özel mesaj gönderebilir. Eğer kullanıcı socket isim vermez ise uygulama tarafından otomatik olarak bir isim verilir.
                </p>

                <pre class="language-javascript">
<code class="language-javascript">
    socket.on("connect", function () {
            socket.emit("firstConnection", apiKey,socketName);
            console.log("connected");
            onConnect();
        });
</code>
                </pre>
                <h3>TÜM KULLANICILARA VERİ GÖNDERİLMESİ</h3>

                <pre class="language-javascript">
<code class="language-javascript">
   socket.emit("sendDataFromClient",data,apiKey,"All");
</code>
                </pre>
                <p>
                    Komutu kullanılarak apiKeye bağlı tüm socketlere veri gönderilebilir. Bu komutla gönderilen veriler Starttonet üzerindeki uygulamaya kaydedildiği için belirli bir formatta gönderilmelidir. Bu format içerisinde kolon isimlerinin ve verilerin bulunduğu JSON formatında olmalıdır. Bu formata örnek olarak proje içerisinde: ”UserName, Message, MessageTo”  kolonları bulunan bir proje için gönderilen verinin {"dc_UserName":"Deneme","dc_Message":"deneme","dc_MessageTo":"All"}  formatında olması gerekir.
                </p>

                <h3>SADECE BİR KULLANICIYA VERİ GÖNDERİLMESİ</h3>

                <pre class="language-javascript">
<code class="language-javascript">
   socket.emit("sendDataFromClient",data,apiKey,socketName);
</code>
                </pre>
                <p>
                    Komutu kullanılarak herhangi bir apiKeydeki bir sockete ismini kullanarak veri gönderilebilir. Yine bu komutla gönderilen verilerde Starttonet üzerindeki uygulamaya kaydedildiği için tüm dinleyicilere gönderilen veri ile aynı formatta olması gereklidir.<br />
                    <br />
                    <strong>Dikkat:</strong> İsimleri büyük küçük harf duyarlıdır.
                </p>

                <h3>SERVER ÜZERİNDEN GÖNDERİLEN VERİNİN ALINMASI</h3>
                <p>
                    Sunucu tarafından bir sockete veri gönderildiğinde  socket.on("getDataFromServer", function (data) fonksiyonu tetiklenir. Bu fonksiyon sunucudan gelen mesajları alır.  Gelen veri formatı JSON dur ve gönderilen veri formatı ile aynıdır.

                </p>
                <pre class="language-javascript">
<code class="language-javascript">
socket.on("getDataFromServer", function (data) {
    console.log("data recived");
    onData(data);
});
</code>
                </pre>

                <h3>UYGULAMADAKİ KOLON İSİMLERİNİN ALINMASI(Yapılacak)</h3>
                <p>
                    Eğer kullanıcı uygulama sırasında veri kolonlarını almak istiyorsa;
                    <strong>Socket.emit("getDataColumns")</strong> işlemini çağırarak sunucudan veri kolonlarını ister sunucu veri kolonları verisini hazırladığında aşağıdaki fonksiyonu tetikleyerek kolon isimlerini bir dizi olarak gönderir. 
                </p>
                <pre class="language-javascript">
<code class="language-javascript">
socket.on("getDataColumns", function (columns) {
            onGetColumns(columns);
            this.columns = columns;
});
</code>
                </pre>

                <h3>SUNUCU İLE ARADAKİ BAĞLANTININ KOPMASI</h3>
                <p>
                    Eğer programla sunucu arasındaki bağlantı bir sebepten dolayı koparsa bu fonksiyon tetiklenir. Ancak tarayıcı veya sekmenin kapatılmasında bu fonksiyon çalışmaz.
                </p>
                <pre class="language-javascript">
<code class="language-javascript">
socket.on('disconnect', function () {
    onDisconnect();
    console.log('disconnected');
});

</code>
                </pre>

                <h3>SUNUCUDAN GELEN HATA MESAJI</h3>
                <p>
                    Kullanıcının hatalı bir işlem yapması sonucunda sunucu tarafından kullanıcıya hata ile ilgili bir mesaj gönderilir bu mesaj aşağıdaki sendError fonksiyonunu tetikleyerek bu metoda hata mesajının içeriğini string olarak gönderir.
                </p>
                <pre class="language-javascript">
<code class="language-javascript">
socket.on('sendError', function (errorMessage) {
    onError(errorMessage);
    console.log('Error:' + errorMessage);
});
</code>
                </pre>

                <h3>APİKEYE BAĞLI BİR KULLANICININ AYRILMASI</h3>
                <p>
                    Api keye bağlı bir soket ayrıldığında sunucu aynı apiKeye bağlı diğer soketlere o socketin ayrıldığını ve bu socketin ismini bildirim olarak gönderir. Bu bildirim mesajı socketDisconnected fonksiyonunu tetikler.
                </p>
                <pre class="language-javascript">
<code class="language-javascript">
socket.on('socketDisconnected', function (socketName) {
    onSocketDisconnected(socketName);
});
</code>
                </pre>


                <h3>APİKEYE BİR KULLANICININ BAĞLANMASI</h3>
                <p>
                    Api keye yeni bir socket bağlandığında sunucu aynı api keye bağlı diğer yeni bir socketin bağlandığı bildirimini ve bu socketin ismini gönderir. Bu bildirim mesajı socketConnected fonksiyonunu tetikler.
                </p>
                <pre class="language-javascript">
<code class="language-javascript">
socket.on('socketConnected', function (socketName) {
    onSocketConnected(socketName);
});
</code>
                </pre>





            </div>
        </div>
        <script src="Scripts/jquery-2.1.4.min.js"></script>
        <script src="Scripts/prism.js"></script>
    </form>
</body>
</html>
