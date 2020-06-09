class unStringifyValues
{
	constructor(ob)
	{
		return this.loop(ob.data,(ob.keys !== undefined) ? ob.keys : [],(ob.all !== undefined) ? ob.all : false);
	}

	loop(data,keys,all)
    {
        var s = this;

        var AR = [];
        var OB = {};
        var converted;
        
        if(Array.isArray(data))
        {
        	for(let i = 0; i < data.length; i++)
        	{
        		AR.push(s.loop(data[i],keys,all));
        	}
        }
        else if(!Array.isArray(data) && typeof data !== 'string' && typeof data !== 'number' && typeof data !== 'boolean')
        {
        	for(let key in data)
        	{
        		OB[key] = s.loop((keys.indexOf(key) > -1) ? s.convert(data[key]) : data[key],keys,(Array.isArray(data[key]) && keys.indexOf(key) > -1) ? true : all);
        	}
        }
        else
        {
        	converted = (all) ? s.convert(data) : data;
        }

        if(AR.length > 0)
        {
			return AR;
        }
        else if(Object.keys(OB).length > 0)
        {
        	return OB;
        }
        else
        {
        	return converted;
        }
    }

    convert(data)
    {
    	if(/^(true|false)$/.test(data))
    	{
    		return JSON.parse(data);
    	}
    	else if(/^[-]?\d+([,\.]\d+)?$/.test(data) && typeof data === 'string')
    	{
    		return parseFloat(data.replace(',','.'));
    	}
    	else
    	{
    		return data;
    	}
    }
}