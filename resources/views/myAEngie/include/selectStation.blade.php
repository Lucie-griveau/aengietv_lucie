<select class="form-control" name="station" id="station" onChange="gotoStation">
    <option><?= "Select Station" ?></option>
    @foreach ($allStations as $stations)
        <option value="{{ $stations->name }}">{{ $stations->name }}</option>
    @endforeach
</select>
