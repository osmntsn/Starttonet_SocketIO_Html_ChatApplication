# Starttonet_SocketIO_Html_ChatApplication
PROJEYE SOCKETIO’NUN EKLENMESİ
SocketIOyu JavaScript ile kullanabilmek için SocketIO’nun JavaScript Client scripti uygulamaya eklenmelidir. Aşağıdaki kodun SocketIO bağlantısı kurulmadan ve fonksiyonları yazılmadan önce Web sayfasına eklenmiş olması gerekir.
<script src="https://cdn.socket.io/socket.io-1.1.0.js"></script>

BAĞLANTININ KURULMASI
Bağlantının kurulması için öncelikle global olarak socket isminde (veya istenilen bir isimde ) bir nesne oluşturulmalıdır. Nesnenin global olarak oluşturulmasının sebebi bu nesne ile hem veri alacağız hem de veri göndereceğiz ve veri gönderme işlemi farklı fonksiyonlar tarafından da yapılabileceği için socket nesnesi global tanımlanmalıdır.
Daha sonra connecttoStarttonet fonksiyonuna benzer bir fonksiyon hazırlanmalıdır. Bu fonksiyonda  socket = io.connect("http://www.starttonet.com:8888"); komutuyla Starttonet sunucusuna bağlantı başlatılır. Daha sonra socket.on() ile başlayan tüm fonsiyonlar başlangıçta oluşturulan connectoStarttonet fonksiyonu içerisinde yazılmalıdır.

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





BAĞLANTININ AYARLARININ YAPILMASI
İlk bağlantının sağlanması aşağıdaki şekilde gerçekleşmelidir. Aşağıdaki fonksiyon socket ile Starttonet arasındaki bağlantı kurulduğunda çalışır. İlk bağlantı kurulduğunda socketin starttonet e hangi apiKey ile bağlandığını söylemesi zorunludur. Ancak sockete isim verip vermemek kullanıcının seçimine bırakılmıştır. Eğer kullanıcı socket ismini kendi verirse daha sonra bu isimleri kullanarak istediği sockete özel mesaj gönderebilir. Eğer kullanıcı socket isim vermez ise uygulama tarafından otomatik olarak bir isim verilir.
    socket.on("connect", function () {
            socket.emit("firstConnection", apiKey,socketName);
            console.log("connected");
            onConnect();
        });
TÜM KULLANICILARA VERİ GÖNDERİLMESİ
socket.emit("sendDataFromClient",data,apiKey,”All”);
Komutu kullanılarak apiKeye bağlı tüm socketlere veri gönderilebilir. Bu komutla gönderilen veriler Starttonet üzerindeki uygulamaya kaydedildiği için belirli bir formatta gönderilmelidir. Bu format içerisinde kolon isimlerinin ve verilerin bulunduğu JSON formatında olmalıdır. Bu formata örnek olarak proje içerisinde: ”UserName, Message, MessageTo”  kolonları bulunan bir proje için gönderilen verinin {"dc_UserName":"Deneme","dc_Message":"deneme","dc_MessageTo":"All"}  formatında olması gerekir.
SADECE BİR KULLANICIYA VERİ GÖNDERİLMESİ
socket.emit("sendDataFromClient",data,apiKey,socketName);
Komutu kullanılarak herhangi bir apiKeydeki bir sockete ismini kullanarak veri gönderilebilir. Yine bu komutla gönderilen verilerde Starttonet üzerindeki uygulamaya kaydedildiği için tüm dinleyicilere gönderilen veri ile aynı formatta olması gereklidir.
Dikkat: İsimleri büyük küçük harf duyarlıdır.
SERVER ÜZERİNDEN GÖNDERİLEN VERİNİN ALINMASI
Sunucu tarafından bir sockete veri gönderildiğinde  socket.on("getDataFromServer", function (data) fonksiyonu tetiklenir. Bu fonksiyon sunucudan gelen mesajları alır.  Gelen veri formatı JSON dur ve gönderilen veri formatı ile aynıdır.
socket.on("getDataFromServer", function (data) {
            console.log("data recived");
            onData(data);
        });


UYGULAMADAKİ KOLON İSİMLERİNİN ALINMASI(Yapılacak)
Eğer kullanıcı uygulama sırasında veri kolonlarını almak istiyorsa;
Socket.emit(“getDataColumns”) işlemini çağırarak sunucudan veri kolonlarını ister sunucu veri kolonları verisini hazırladığında aşağıdaki fonksiyonu tetikleyerek kolon isimlerini bir dizi olarak gönderir. 
socket.on("getDataColumns", function (columns) {
            onGetColumns(columns);
            this.columns = columns;
        });

SUNUCU İLE ARADAKİ BAĞLANTININ KOPMASI
Eğer programla sunucu arasındaki bağlantı bir sebepten dolayı koparsa bu fonksiyon tetiklenir. Ancak tarayıcı veya sekmenin kapatılmasında bu fonksiyon çalışmaz.
        socket.on('disconnect', function () {
            onDisconnect();
            console.log('disconnected');
        });
SUNUCUDAN GELEN HATA MESAJI
Kullanıcının hatalı bir işlem yapması sonucunda sunucu tarafından kullanıcıya hata ile ilgili bir mesaj gönderilir bu mesaj aşağıdaki sendError fonksiyonunu tetikleyerek bu metoda hata mesajının içeriğini string olarak gönderir.
        socket.on('sendError', function (errorMessage) {
            onError(errorMessage);
            console.log('Error:' + errorMessage);
        });
APİKEYE BAĞLI BİR KULLANICININ AYRILMASI
Api keye bağlı bir soket ayrıldığında sunucu aynı apiKeye bağlı diğer soketlere o socketin ayrıldığını ve bu socketin ismini bildirim olarak gönderir. Bu bildirim mesajı socketDisconnected fonksiyonunu tetikler.
socket.on('socketDisconnected', function (socketName) {
            onSocketDisconnected(socketName);
        });


APİKEYE BİR KULLANICININ BAĞLANMASI
Api keye yeni bir socket bağlandığında sunucu aynı api keye bağlı diğer yeni bir socketin bağlandığı bildirimini ve bu socketin ismini gönderir. Bu bildirim mesajı socketConnected fonksiyonunu tetikler.
        socket.on('socketConnected', function (socketName) {
            onSocketConnected(socketName);
        });
