# jQuery ajaxOnStatus-Observer

Es wird oft benötigt, bei jedem AJAX-Request nach bestimmte HTTP-Statuscodes zu prüfen und entsprechend
reagieren, Gute Beispiel ist 401-Code (Unauthorized). In dem Fall wäre eine die beste Lösung, den Benutzer
zur Login-Seite weiterzuleiten. Übliche techniken wie man es immer macht sind meist unübersichtlich. Das Plugin
erlaubt dem Entwickler ein bisschen sauberer Code eventbasierend und ohne switch-case-Blöcke zu schreiben.

Die Callback-Methoden sind immer gleich der jQuery.ajaxComplete - Methode.

Es können auch mehrere Händlers für gleichen Code registriert werden. In dem Fall werden sie in der Registrierungsreihenfolge von dem Observer getriggert.

## Installation
```html
<head>
  <script src="./jquery.ajaxOnStatus.js"></script>
</head>
```

## Example

Folgende Beispiel zeigt, wie man  den Benutzer zu Login-Seite automatisch weiterleiten kann, wenn er nicht mehr Angemeldet ist, oder die Session abgelaufen ist.

```javascript
$.ajaxOnStatus(401, function(event, xhr, ajaxOptions){
    location.href = "login.php";
});
```

## Tests
```sh
$ open ./tests/index.html
```
