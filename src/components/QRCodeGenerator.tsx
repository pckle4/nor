import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Download, QrCode, Palette, Settings, Wifi, Phone, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const QRCodeGenerator = () => {
  const [qrType, setQrType] = useState('text');
  const [text, setText] = useState('https://nowhile.com');
  
  // WiFi fields
  const [wifiSSID, setWifiSSID] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');
  const [wifiSecurity, setWifiSecurity] = useState('WPA');
  
  // Phone fields
  const [phoneNumber, setPhoneNumber] = useState('');
  
  // Email fields
  const [emailAddress, setEmailAddress] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  
  // SMS fields
  const [smsNumber, setSmsNumber] = useState('');
  const [smsMessage, setSmsMessage] = useState('');
  
  // Location fields
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  
  // vCard fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [organization, setOrganization] = useState('');
  const [vcardPhone, setVcardPhone] = useState('');
  const [vcardEmail, setVcardEmail] = useState('');
  const [vcardWebsite, setVcardWebsite] = useState('');
  
  // Event fields
  const [eventTitle, setEventTitle] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventStart, setEventStart] = useState('');
  const [eventEnd, setEventEnd] = useState('');
  
  // UPI fields
  const [upiId, setUpiId] = useState('');
  const [upiName, setUpiName] = useState('');
  const [upiAmount, setUpiAmount] = useState('');
  const [upiNote, setUpiNote] = useState('');
  
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [foregroundColor, setForegroundColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [size, setSize] = useState([400]);
  const [errorLevel, setErrorLevel] = useState('M');
  const [format, setFormat] = useState('png');
  const [margin, setMargin] = useState([4]);
  const [borderRadius, setBorderRadius] = useState([0]);
  const [dotScale, setDotScale] = useState([1]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const generateQRData = () => {
    switch (qrType) {
      case 'wifi':
        return `WIFI:T:${wifiSecurity};S:${wifiSSID};P:${wifiPassword};;`;
      case 'phone':
        return `tel:${phoneNumber}`;
      case 'email':
        return `mailto:${emailAddress}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      case 'sms':
        return `sms:${smsNumber}?body=${encodeURIComponent(smsMessage)}`;
      case 'location':
        return `geo:${latitude},${longitude}`;
      case 'upi':
        return `upi://pay?pa=${upiId}&pn=${encodeURIComponent(upiName)}&am=${upiAmount}&tn=${encodeURIComponent(upiNote)}`;
      case 'vcard':
        return `BEGIN:VCARD
VERSION:3.0
FN:${firstName} ${lastName}
ORG:${organization}
TEL:${vcardPhone}
EMAIL:${vcardEmail}
URL:${vcardWebsite}
END:VCARD`;
      case 'event':
        return `BEGIN:VEVENT
SUMMARY:${eventTitle}
LOCATION:${eventLocation}
DTSTART:${eventStart.replace(/[-:]/g, '')}00Z
DTEND:${eventEnd.replace(/[-:]/g, '')}00Z
END:VEVENT`;
      case 'text':
      default:
        return text;
    }
  };

  const generateQRCode = async () => {
    const qrData = generateQRData();
    
    if (!qrData.trim()) {
      toast({
        title: "Error",
        description: "Please fill in the required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const options = {
        errorCorrectionLevel: errorLevel as 'L' | 'M' | 'Q' | 'H',
        type: 'image/png' as const,
        quality: 0.92,
        margin: margin[0],
        color: {
          dark: foregroundColor,
          light: backgroundColor,
        },
        width: size[0],
        scale: dotScale[0],
      };

      const qrDataUrl = await QRCode.toDataURL(qrData, options);
      setQrCodeUrl(qrDataUrl);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate QR code",
        variant: "destructive",
      });
    }
  };

  const downloadQRCode = async (downloadFormat: string) => {
    if (!qrCodeUrl) {
      toast({
        title: "Error",
        description: "Please generate a QR code first",
        variant: "destructive",
      });
      return;
    }

    try {
      const qrData = generateQRData();
      let dataUrl = '';
      let filename = '';

      if (downloadFormat === 'svg') {
        const svgString = await QRCode.toString(qrData, {
          type: 'svg',
          errorCorrectionLevel: errorLevel as 'L' | 'M' | 'Q' | 'H',
          margin: margin[0],
          color: {
            dark: foregroundColor,
            light: backgroundColor,
          },
          width: size[0],
        });
        dataUrl = 'data:image/svg+xml;base64,' + btoa(svgString);
        filename = `qrcode.svg`;
      } else if (downloadFormat === 'pdf') {
        // For PDF, we'll use the PNG and let the browser handle it
        dataUrl = qrCodeUrl;
        filename = `qrcode.pdf`;
      } else {
        // PNG, JPG, WEBP
        const options = {
          errorCorrectionLevel: errorLevel as 'L' | 'M' | 'Q' | 'H',
          type: downloadFormat === 'jpg' ? 'image/jpeg' : downloadFormat === 'webp' ? 'image/webp' : 'image/png',
          quality: 0.92,
          margin: margin[0],
          color: {
            dark: foregroundColor,
            light: backgroundColor,
          },
          width: size[0],
        };
        dataUrl = await QRCode.toDataURL(qrData, options as any);
        filename = `qrcode.${downloadFormat}`;
      }

      const link = document.createElement('a');
      link.download = filename;
      link.href = dataUrl;
      link.click();

      toast({
        title: "Success",
        description: `QR code downloaded as ${downloadFormat.toUpperCase()}!`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download QR code",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    generateQRCode();
  }, [qrType, text, wifiSSID, wifiPassword, wifiSecurity, phoneNumber, emailAddress, emailSubject, emailBody, smsNumber, smsMessage, latitude, longitude, firstName, lastName, organization, vcardPhone, vcardEmail, vcardWebsite, eventTitle, eventLocation, eventStart, eventEnd, upiId, upiName, upiAmount, upiNote, foregroundColor, backgroundColor, size, errorLevel, margin, dotScale]);

  const colorPresets = [
    { name: 'Classic', fg: '#000000', bg: '#ffffff' },
    { name: 'Ocean', fg: '#1e40af', bg: '#dbeafe' },
    { name: 'Forest', fg: '#166534', bg: '#dcfce7' },
    { name: 'Sunset', fg: '#dc2626', bg: '#fef2f2' },
    { name: 'Purple', fg: '#7c3aed', bg: '#f3e8ff' },
    { name: 'Dark', fg: '#ffffff', bg: '#1f2937' },
  ];

  const downloadFormats = [
    { value: 'png', label: 'PNG' },
    { value: 'jpg', label: 'JPG' },
    { value: 'svg', label: 'SVG' },
    { value: 'webp', label: 'WebP' },
    { value: 'pdf', label: 'PDF' },
  ];

  const renderQRTypeFields = () => {
    switch (qrType) {
      case 'wifi':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="wifi-ssid" className="text-sm font-medium flex items-center gap-2">
                <Wifi className="w-4 h-4" />
                WiFi Network Name (SSID)
              </Label>
              <Input
                id="wifi-ssid"
                value={wifiSSID}
                onChange={(e) => setWifiSSID(e.target.value)}
                placeholder="Enter WiFi network name..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wifi-password" className="text-sm font-medium">WiFi Password</Label>
              <Input
                id="wifi-password"
                type="password"
                value={wifiPassword}
                onChange={(e) => setWifiPassword(e.target.value)}
                placeholder="Enter WiFi password..."
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Security Type</Label>
              <Select value={wifiSecurity} onValueChange={setWifiSecurity}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WPA">WPA/WPA2</SelectItem>
                  <SelectItem value="WEP">WEP</SelectItem>
                  <SelectItem value="nopass">No Password</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case 'phone':
        return (
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Phone Number
            </Label>
            <Input
              id="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter phone number..."
            />
          </div>
        );
      case 'email':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                placeholder="Enter email address..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-subject" className="text-sm font-medium">Subject (Optional)</Label>
              <Input
                id="email-subject"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                placeholder="Enter email subject..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-body" className="text-sm font-medium">Message (Optional)</Label>
              <Input
                id="email-body"
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                placeholder="Enter email message..."
              />
            </div>
          </div>
        );
      case 'sms':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sms-number" className="text-sm font-medium">Phone Number</Label>
              <Input
                id="sms-number"
                value={smsNumber}
                onChange={(e) => setSmsNumber(e.target.value)}
                placeholder="Enter phone number..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sms-message" className="text-sm font-medium">Message</Label>
              <Input
                id="sms-message"
                value={smsMessage}
                onChange={(e) => setSmsMessage(e.target.value)}
                placeholder="Enter SMS message..."
              />
            </div>
          </div>
        );
      case 'location':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="latitude" className="text-sm font-medium">Latitude</Label>
              <Input
                id="latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                placeholder="Enter latitude (e.g., 37.7749)"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="longitude" className="text-sm font-medium">Longitude</Label>
              <Input
                id="longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                placeholder="Enter longitude (e.g., -122.4194)"
              />
            </div>
          </div>
        );
      case 'upi':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="upi-id" className="text-sm font-medium">UPI ID</Label>
              <Input
                id="upi-id"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="Enter UPI ID (e.g., user@paytm)"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="upi-name" className="text-sm font-medium">Payee Name</Label>
              <Input
                id="upi-name"
                value={upiName}
                onChange={(e) => setUpiName(e.target.value)}
                placeholder="Enter payee name..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="upi-amount" className="text-sm font-medium">Amount (Optional)</Label>
              <Input
                id="upi-amount"
                type="number"
                value={upiAmount}
                onChange={(e) => setUpiAmount(e.target.value)}
                placeholder="Enter amount..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="upi-note" className="text-sm font-medium">Note (Optional)</Label>
              <Input
                id="upi-note"
                value={upiNote}
                onChange={(e) => setUpiNote(e.target.value)}
                placeholder="Enter payment note..."
              />
            </div>
          </div>
        );
      case 'vcard':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name" className="text-sm font-medium">First Name</Label>
                <Input
                  id="first-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name" className="text-sm font-medium">Last Name</Label>
                <Input
                  id="last-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name..."
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="organization" className="text-sm font-medium">Organization</Label>
              <Input
                id="organization"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="Company/Organization..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vcard-phone" className="text-sm font-medium">Phone</Label>
              <Input
                id="vcard-phone"
                value={vcardPhone}
                onChange={(e) => setVcardPhone(e.target.value)}
                placeholder="Phone number..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vcard-email" className="text-sm font-medium">Email</Label>
              <Input
                id="vcard-email"
                type="email"
                value={vcardEmail}
                onChange={(e) => setVcardEmail(e.target.value)}
                placeholder="Email address..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vcard-website" className="text-sm font-medium">Website</Label>
              <Input
                id="vcard-website"
                value={vcardWebsite}
                onChange={(e) => setVcardWebsite(e.target.value)}
                placeholder="Website URL..."
              />
            </div>
          </div>
        );
      case 'event':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="event-title" className="text-sm font-medium">Event Title</Label>
              <Input
                id="event-title"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                placeholder="Event title..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-location" className="text-sm font-medium">Location</Label>
              <Input
                id="event-location"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
                placeholder="Event location..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="event-start" className="text-sm font-medium">Start Date & Time</Label>
                <Input
                  id="event-start"
                  type="datetime-local"
                  value={eventStart}
                  onChange={(e) => setEventStart(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-end" className="text-sm font-medium">End Date & Time</Label>
                <Input
                  id="event-end"
                  type="datetime-local"
                  value={eventEnd}
                  onChange={(e) => setEventEnd(e.target.value)}
                />
              </div>
            </div>
          </div>
        );
      case 'text':
      default:
        return (
          <div className="space-y-2">
            <Label htmlFor="text" className="text-sm font-medium">
              Text or URL
            </Label>
            <Input
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text or URL..."
              className="transition-all duration-200 focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        );
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Controls Panel */}
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            QR Code Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* QR Type Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">QR Code Type</Label>
            <Select value={qrType} onValueChange={setQrType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text/URL</SelectItem>
                <SelectItem value="wifi">WiFi Network</SelectItem>
                <SelectItem value="phone">Phone Number</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="sms">SMS Message</SelectItem>
                <SelectItem value="location">Location (GPS)</SelectItem>
                <SelectItem value="upi">UPI Payment</SelectItem>
                <SelectItem value="vcard">Business Card (vCard)</SelectItem>
                <SelectItem value="event">Calendar Event</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Dynamic Fields Based on QR Type */}
          {renderQRTypeFields()}

          {/* Color Presets - More Compact */}
          <div className="space-y-3">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Color Presets
            </Label>
            <div className="grid grid-cols-3 gap-2">
              {colorPresets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => {
                    setForegroundColor(preset.fg);
                    setBackgroundColor(preset.bg);
                  }}
                  className="group relative w-full h-8 rounded border border-gray-200 hover:border-gray-400 transition-all duration-200 overflow-hidden"
                  title={preset.name}
                >
                  <div
                    className="w-full h-full"
                    style={{
                      background: `linear-gradient(45deg, ${preset.bg} 50%, ${preset.fg} 50%)`,
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
                </button>
              ))}
            </div>
          </div>

          {/* Custom Colors */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="foreground" className="text-xs font-medium">Foreground</Label>
              <div className="flex gap-2">
                <Input
                  id="foreground"
                  type="color"
                  value={foregroundColor}
                  onChange={(e) => setForegroundColor(e.target.value)}
                  className="w-10 h-8 p-1 border rounded cursor-pointer"
                />
                <Input
                  value={foregroundColor}
                  onChange={(e) => setForegroundColor(e.target.value)}
                  className="flex-1 text-xs h-8"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="background" className="text-xs font-medium">Background</Label>
              <div className="flex gap-2">
                <Input
                  id="background"
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="w-10 h-8 p-1 border rounded cursor-pointer"
                />
                <Input
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="flex-1 text-xs h-8"
                />
              </div>
            </div>
          </div>

          {/* Advanced Customization */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Size: {size[0]}px</Label>
                <Slider
                  value={size}
                  onValueChange={setSize}
                  max={800}
                  min={200}
                  step={50}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Margin: {margin[0]}</Label>
                <Slider
                  value={margin}
                  onValueChange={setMargin}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Dot Scale: {dotScale[0]}x</Label>
              <Slider
                value={dotScale}
                onValueChange={setDotScale}
                max={2}
                min={0.5}
                step={0.1}
                className="w-full"
              />
            </div>
          </div>

          {/* Error Correction */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Error Correction</Label>
            <Select value={errorLevel} onValueChange={setErrorLevel}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="L">Low (7%)</SelectItem>
                <SelectItem value="M">Medium (15%)</SelectItem>
                <SelectItem value="Q">Quartile (25%)</SelectItem>
                <SelectItem value="H">High (30%)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* QR Code Preview */}
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="w-5 h-5" />
            QR Code Preview
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6">
          <div className="relative">
            {qrCodeUrl ? (
              <div className="relative group">
                <img
                  src={qrCodeUrl}
                  alt="Generated QR Code"
                  className="rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-lg" />
              </div>
            ) : (
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50"
                style={{ width: size[0], height: size[0] }}
              >
                <QrCode className="w-16 h-16 text-gray-400" />
              </div>
            )}
          </div>

          <div className="w-full space-y-3">
            <Button
              onClick={generateQRCode}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <QrCode className="w-4 h-4 mr-2" />
              Generate QR Code
            </Button>
            
            <div className="grid grid-cols-5 gap-2">
              {downloadFormats.map((fmt) => (
                <Button
                  key={fmt.value}
                  onClick={() => downloadQRCode(fmt.value)}
                  variant="outline"
                  size="sm"
                  className="text-xs border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300"
                >
                  {fmt.label}
                </Button>
              ))}
            </div>
          </div>

          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </CardContent>
      </Card>
    </div>
  );
};

export default QRCodeGenerator;
